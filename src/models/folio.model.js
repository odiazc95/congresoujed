import mongoose from "mongoose";

const folioSchema = new mongoose.Schema({

    keyUnique: {
        type: String,
        unique: true
    },
    congreso: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Congreso',
        required: true
    }],
    participantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    asistencia: {
        type: String,
        enum: ['false', 'true'],
        default: 'false'
    }
}, {
    timestamps: true
})

export default mongoose.model("Folio", folioSchema);