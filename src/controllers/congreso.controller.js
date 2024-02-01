import Congreso from "../models/congreso.model.js";

export const createCongreso = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const { nombre, descripcion, ubicacion, dia, mes, year, hora_inicio, hora_fin, img } = req.body

    console.log(img)

    const newCongreso = new Congreso({
        nombre,
        descripcion,
        ubicacion,
        dia,
        mes,
        year,
        hora_inicio,
        hora_fin
    });

    if (req.file) {
        const { filename } = req.file
        newCongreso.setImgUrl(filename)
    }

    const savedCongreso = await newCongreso.save();
    res.json(savedCongreso);
};

export const getCongresos = async (req, res) => {
    const congreso = await Congreso.find().populate('eventos').populate('folios');
    if (!congreso) {
        return res.status(404).json({ message: "Congreso not found" });
    }
    res.json(congreso);
};

export const getCongreso = async (req, res) => {
    const congreso = await Congreso.findById(req.params.id);
    if (!congreso) {
        return res.status(404).json({ message: "congreso not found" });
    }
    res.json(congreso);
};

export const updateCongreso = async (req, res) => {
    const congreso = await Congreso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!congreso) {
        return res.status(404).json({ message: "Congreso not found" });
    }
    res.json(congreso);
};

export const deleteCongreso = async (req, res) => {
    try {
        const deletedcongreso = await Congreso.findByIdAndDelete(req.params.id);
        if (!deletedcongreso) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};
