"use server"

import { db } from "@/lib/db";

export const getAllUsers = async () => {
  const users = await db.user.findMany();
  return users;
}

export const removeUserById = async (id: string) => {
  try {
    const deletedUser = await db.user.delete({
      where: { id }
    })
    return { succes: "Utilisateur suprimé" };
  } catch (error) {
    return { error: "Il y a eu une erreur" };
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id }, include: { address: true } });
    return user;
  } catch {
    return null;
  }
};

export const getAdressById = async (id: string) => {
  if (id != "") {
    try {
      const adress = db.address.findUnique({ where: { id } });
      return adress
    } catch {
      return null
    }
  }
  return null
}