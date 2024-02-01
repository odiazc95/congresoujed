import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { name, lastName, email, password } = req.body

    try {

        const userFound = await User.findOne({ email }).populate('folios')
        if (userFound) {
            return res.status(400).json(['El correo esta en uso']);
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            lastName,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: newUser._id });
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            lastName: userSaved.lastName,
            email: userSaved.email,
            role: userSaved.role,
            folios: userSaved.folios,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json(['El usuario no se creo correctamente']);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        /*Encuentra al usuario con el email del usuario*/
        const userFound = await User.findOne({ email: email }).populate('folios');
        if (!userFound) {
            return res.status(400).json(['No se encotro el usuario']);
        }

        /*Compara la contraseñas hasheada*/
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json(['Contraseña invalida']);
        }

        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            name: userFound.name,
            lastName: userFound.lastName,
            email: userFound.email,
            role: userFound.role,
            folios: userFound.folios,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json(['No autorizado']);
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(401).json(['No autorizado']);
        }

        const userFound = await User.findById(user.id).populate('folios')
        if (!userFound) {
            return res.status(401).json(['No se encontro el usuario']);
        }
        return res.json({
            id: userFound._id,
            name: userFound.name,
            lastName: userFound.lastName,
            email: userFound.email,
            role: userFound.role,
            folios: userFound.folios,
        });
    });
}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id).populate('folios')

    if (!userFound) {
        return res.status(400).json(['No se encontro el usuario']);
    }

    return res.json({
        id: userFound._id,
        name: userFound.name,
        lastName: userFound.lastName,
        email: userFound.email,
        role: userFound.role,
        folios: userFound.folios,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};