import * as z from "zod";
import { UserRole, appointmentType } from "@prisma/client";

// Définissez le fuseau horaire souhaité
const timezone = 'Europe/Paris';

// Créez un schéma personnalisé pour valider et transformer les objets Date
const DateWithTimezoneSchema = z.preprocess((arg) => {
  if (typeof arg === "string") {
    return new Date(arg);
  } else if (arg instanceof Date) {
    return arg;
  } else {
    return new Date();
  }
}, z.date().refine((date) => !isNaN(date.getTime()), "Invalid Date"))
  .transform((date) => {
    return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  });

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  firstName: z.optional(z.string()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  phone: z.optional(z.string().min(6)),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "Nouveau Mot de passe requis !",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Nouveau Mot de passe requis !",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "6 caractères minimum !",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Adresse mail attendue",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Adresse mail attendue",
  }),
  password: z.string().min(1, {
    message: "Mot de passe mail attendue",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Adresse mail attendue",
  }),
  password: z.string().min(6, {
    message: "6 caractères minimum !",
  }),
  name: z.string().min(1, {
    message: "Nom attendue",
  }),
  firstName: z.string().min(1, {
    message: "prenom attendue",
  }),
  phone: z.string().min(10, { 
    message: "tel Invalide" 
  }).max(11, { 
    message: "tel Invalide" 
  }),
});

export const NewAppointment = z.object({
  type: z.enum([appointmentType.COURS, appointmentType.BAPTEME, appointmentType.ALL]),
  date: DateWithTimezoneSchema,
  timeStart: DateWithTimezoneSchema,
  timeEnd: DateWithTimezoneSchema,
  recurrence: z.boolean(),
  dateEndReccurence: DateWithTimezoneSchema.optional(),
});