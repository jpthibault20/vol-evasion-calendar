"use server"

import { db } from "@/lib/db";

export const getAllUsers = async() => {
    const users = await db.user.findMany();
    return users;
}

export const removeUserById = async(id: string) => {
    try {
        const deletedUser = await db.user.delete({
          where: { id }
        })
        return {succes: "Utilisateur suprimé"};
      } catch (error) {
            return {error: "Il y a eu une erreur"};
      }
}

export const getUserById = async (id: string) => {
    try {
      const user = await db.user.findUnique({ where: { id } });
      return user;
    } catch {
      return null;
    }
  };