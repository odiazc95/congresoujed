import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

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
    },
    congreso: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Congreso',
        required: true
    }]
}, {
    timestamps: true
})

export default mongoose.model("Evento", eventSchema);