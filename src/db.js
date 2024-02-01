import mongoose from 'mongoose'
import { URI } from './config.js';

console.log('-----------------------------Hola-----------------------------------')
console.log(URI)

export const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('>>>Connected to MongoDB');
    } catch (error) {
        console.log("----------------------------------------------------------------");
        console.log(error);
    }
}