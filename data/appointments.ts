"use server"

import { db } from "@/lib/db";

export const getAppoitments = async (client: boolean) => {
  try {
    const user = await db.appointment.findMany();
    return user;
  } catch {
    return null;
  }
};