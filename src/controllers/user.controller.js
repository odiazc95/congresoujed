import User from '../models/user.model.js'
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    const user = await User.find()
    if (!user) {
        return res.status(404).json({ message: "users not found" });
    }
    res.json(user);
};

export const getUser = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) {
        return res.status(400).json(['No se encontro el usuario']);
    }

    return res.json({
        id: userFound._id,
        name: userFound.name,
        lastName: userFound.lastName,
        email: userFound.email,
        role: userFound.role,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};

export const createUser = async (req, res) => {
    const { name, lastName, email, password, role } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            lastName,
            email,
            password: passwordHash,
            role,
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


