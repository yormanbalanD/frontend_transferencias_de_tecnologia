import { z } from 'zod/v4';

export const userSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    correo: z.string(),
    contraseña: z.string(),
});

export const userLoginSchema = z.object({
    correo: z.email({
        error: 'Correo inválido',
    }).min(3, {
        error: (issue) => `Correo demasiado corto, minimo ${issue.minimum} caracteres`,
    }),
    contraseña: z.string().min(8, {
        message: 'Contraseña demasiado corta, minimo 8 caracteres',
    }),
});

export const userRegisterSchema = z.object({
    nombre: z.string(),
    correo: z.string(),
    contraseña: z.string(),
    confirmarContraseña: z.string(),
});