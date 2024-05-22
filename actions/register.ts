"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { randomUUID } from "crypto";
import randomColor from "randomcolor";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champs non valides !" };
  }

  const { email, phone, password, name, firstName } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "L'email est déjà utilisé !" };
  }

  const phoneNumber = Number(phone);
  if (isNaN(phoneNumber)) {
    return{error: "Téléphone invalide"}
  }

  const adressID = randomUUID();
  const userID = randomUUID();

  await db.address.create({
    data: {
      id: adressID
    }
  })

  await db.user.create({
    data: {
      id: userID,
      name,
      firstName,
      email,
      password: hashedPassword,
      phone,
      addressId: adressID,
      color: randomColor()
    },
  });

  const verificationToken = await generateVerificationToken(email, userID);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Email de confirmation envoyé !" };
};
