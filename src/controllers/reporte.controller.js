import Reporte from "../models/reporte.model.js";

export const createReporte = async (req, res) => {
    console.log(req.body)
    const { titulo, descripcion, revisado } = req.body

    const newReporte = new Reporte({
        titulo,
        descripcion,
        revisado
    });

    if (req.file) {
        const { filename } = req.file
        newReporte.setArchivoUrl(filename)
    }

    const savedReporte = await newReporte.save();
    res.json(savedReporte);
};

export const getReportes = async (req, res) => {
    const reporte = await Reporte.find();
    if (!reporte) {
        return res.status(404).json({ message: "reporte not found" });
    }
    res.json(reporte);
};

export const getReporte = async (req, res) => {
    const reporte = await Reporte.findById(req.params.id);
    if (!reporte) {
        return res.status(404).json({ message: "reporte not found" });
    }
    res.json(reporte);
};

export const updateReporte = async (req, res) => {
    const reporte = await Reporte.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reporte) {
        return res.status(404).json({ message: "reporte not found" });
    }
    res.json(reporte);
};

export const deleteReporte = async (req, res) => {
    try {
      const reporte = await Reporte.findByIdAndDelete( req.params.id);
      if (!reporte) {
        return res.status(404).json({ message: 'Lugar no encontrado' });
      }
      res.json({ message: 'Lugar eliminado correctamente' });
    } catch (error) {
      
      res.status(500).json({ message: error.message });
    }
  };
