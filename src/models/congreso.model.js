import mongoose from "mongoose";
import { PORT } from "../config.js";

const congresoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    dia: {
        type: String,
        required: true
    },
    mes: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    hora_inicio: {
        type: String,
        required: true
    },
    hora_fin: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    folios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folio',
    }],
    eventos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento',
    }]
}, {
    timestamps: true
})

congresoSchema.methods.setImgUrl = function setImgUrl(fileName) {
    this.img = `http://localhost:${PORT}/public/${fileName}`
}

export default mongoose.model("Congreso", congresoSchema);