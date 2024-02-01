import Evento from "../models/evento.model.js";
import Congreso from "../models/congreso.model.js";

export const createEvento = async (req, res) => {
    const { nombre, descripcion, ubicacion, dia, mes, year, hora_inicio, hora_fin, congresoId } = req.body

    const congreso = await Congreso.findById(congresoId);

    const newEvento = new Evento({
        nombre,
        descripcion,
        ubicacion,
        dia,
        mes,
        year,
        hora_inicio,
        hora_fin,
        congreso: congreso._id
    });

    const savedEvento = await newEvento.save();
    congreso.eventos = congreso.eventos.concat(savedEvento._id)
    await congreso.save();

    res.json(savedEvento);
};

export const getEventos = async (req, res) => {
    const evento = await Evento.find();
    if (!evento) {
        return res.status(404).json({ message: "Evento not found" });
    }
    res.json(evento);
};

export const getEvento = async (req, res) => {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
        return res.status(404).json({ message: "Evento not found" });
    }
    res.json(evento);
};

export const updateEvento = async (req, res) => {
    const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evento) {
        return res.status(404).json({ message: "Evento not found" });
    }
    res.json(evento);
};

export const deleteEvento = async (req, res) => {
    const evento = await Evento.findByIdAndDelete(req.params.id);
    if (!evento) {
        return res.status(404).json({ message: "Evento not found" });
    }
    res.sendStatus(204);
};
