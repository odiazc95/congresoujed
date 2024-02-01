import Folio from "../models/folio.model.js";
import Congreso from "../models/congreso.model.js";
import User from "../models/user.model.js";

export const createFolio = async (req, res) => {
    const { keyUnique, congresoId, participanteId } = req.body

    console.log(req.body)

    const congreso = await Congreso.findById(congresoId);
    const user = await User.findById(participanteId);

    const newFolio = new Folio({
        keyUnique,
        congreso: congreso._id,
        participantes: user._id
    });

    const savedFolio = await newFolio.save();
    congreso.folios = congreso.folios.concat(savedFolio._id)
    await congreso.save();
    user.folios = user.folios.concat(savedFolio._id)
    await user.save();

    res.json(savedFolio);
};

export const getFolios = async (req, res) => {

    const folio = await Folio.find().populate('congreso', {
        nombre: 1
    });
    if (!folio) {
        return res.status(404).json({ message: "Folio not found" });
    }
    res.json(folio);
};

export const getFolio = async (req, res) => {
    const folio = await Folio.findById(req.params.id).populate('congreso');
    if (!folio) {
        return res.status(404).json({ message: "Folio not found" });
    }
    res.json(folio);
};

export const updateFolio = async (req, res) => {
    const folio = await Folio.findOneAndUpdate({ keyUnique: req.params.id }, req.body, { new: true });
    if (!folio) {
        return res.status(404).json({ message: "Folio not found" });
    }
    res.json(folio);
};

export const deleteFolio = async (req, res) => {
    const folio = await Folio.findByIdAndDelete(req.params.id);
    if (!folio) {
        return res.status(404).json({ message: "Folio not found" });
    }
    res.sendStatus(204);
};
