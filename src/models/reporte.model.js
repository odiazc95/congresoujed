import mongoose from "mongoose";
import { PORT } from "../config.js";

const reporteSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    archivo: {
        type: String,
        required: false
    },
    revisado: {
        type: String,
        enum: ['Aceptado', 'Pendiente', 'No aceptado'],
        default: 'Pendiente'
    },
}, {
    timestamps: true
})

reporteSchema.methods.setArchivoUrl = function setArchivoUrl(fileName) {
    this.archivo = `https://localhost:${PORT}/public/${fileName}`
}

export default mongoose.model("Reporte", reporteSchema);