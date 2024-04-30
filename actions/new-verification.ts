"use server";

import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificiation-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Le jeton n'existe pas !" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Le jeton a expiré !" };
  }

  const existingUser = await getUserById(existingToken.userID);
  if (!existingUser) {
    return { error: "Le compte n'existe pas !" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  return { success: "Mail verifié !" };
};
