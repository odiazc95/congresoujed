import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string({
        required_error: 'Nombre es requerido'
    }),

    lastName: z.string({
        required_error: 'Apellido es requerido'
    }),

    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        required_error: 'Email es invalido'
    }),

    password: z.string({
        required_error: 'Contraseña es requerida'
    }).min(8, {
        message: 'Password must be at least 8 characters'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        required_error: 'Email is invalid'
    }),

    password: z.string({
        required_error: 'Contraseña es requerida'
    }).min(8, {
        message: 'La contraseña debe ser de minimo 8 caracteres'
    })
})