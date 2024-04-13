import * as z from "zod";
import { UserRole } from "@prisma/client";

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
  // firstName: z.string().min(1, {
  //   message: "prenom attendue",
  // }),
  // phone: z.number().min(10, {
  //   message: "Téléphone attendue",
  // }),
});
