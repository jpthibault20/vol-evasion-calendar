"use server"

import { db } from "@/lib/db";
import { User, appointmentType } from "@prisma/client";

export const getAllUsers = async () => {
  const users = await db.user.findMany();
  return users;
}

export const getAllAdress = async () => {
  const users = await db.address.findMany();
  return users;
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

export const removeUserById = async (id: string) => {
  const user = await getUserById(id);

  try {
    await db.address.delete({where: {id: user?.addressId as string}});
    await db.user.delete({where: { id }});

  } catch (error) {
    return { error: "Il y a eu une erreur" };
  }
  
  return { succes: "Utilisateur suprimé" };
}

export const addUserToAppointment = async(appointmentID: string, userID: string) => {
  try {
    await db.appointment.update({
      where: {id: appointmentID},
      data: { studentID: userID}
    });
  } catch (error) {
    console.log(error);
    return { error: "Il y a eu une erreur" };
  }

  return {success: "Mise à jour effectué avec succes"};
} 

export const removeStudentUser = async(appointmentID: string) => {
  if (!appointmentID) {
    return {error: "Error ID"}
  }
  try {
    await db.appointment.update({
      where: {id: appointmentID},
      data: {studentID: ""}
    })
  } catch (error) {
    console.log(error);
    return { error: "Il y a eu une erreur" };
  }
  return {success: "Mise à jour effectué avec succes"};
}