"use server"


import { getUserById } from "@/data/user";
import { getAdressById } from "./user";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

interface dataInterface {
    name: string,
    Prenom: string,
    email: string,
    phone: string,
    adress: string,
    adressCity: string,
    adressZipCode: string,
    adressCountries: string,
    role: UserRole,
}

export const updateUserAction = async (userID: string, adressID: string, data: dataInterface) => {
    console.log("user id : ", userID);
    console.log("adress id : ", adressID);
    console.log("data : ", data);

    const dataUser = await getUserById(userID);
    const dataAdress = await getAdressById(adressID);

    if (data.name != dataUser?.name) {
        const res = await updateName(userID, data.name);
        
        if (res.error) {
            return { error: "res.error" }
        }
    };

    if (data.Prenom != dataUser?.firstName) {
        const res = await updateFirstName(userID, data.Prenom);
        
        if (res.error) {
            return { error: "res.error" }
        }
    };

    

    // const {email} = data;
    // if (email != dataUser?.email) {

    // };

    // const {phone} = data;
    // if (phone != dataUser?.phone) {

    // };

    // const {role} = data;
    // if (role != dataUser?.role) {

    // };

    // const {adressCity} = data;
    // if (adressCity != dataAdress?.city) {

    // };

    // const {adressCountry} = data;
    // if (adressCountry != dataAdress?.country) {

    // };

    // const {adress} = data;
    // if (adress != dataAdress?.adress) {

    // };

    // const {adressZipCode} = data;
    // if (adressZipCode != dataAdress?.zipCode) {

    // };

    return { success: "Utilisateur mis à jour" }
};


export const updateName = async (ID: string, Name: string) => {
    if (Name.length < 3) {
        return { error: "Le nom doit avoir au minimum 3 charactères" };
    };
    try {
        console.log(Name)
        await db.user.update({
            where: { id: ID },
            data: { name: Name }
        });
    } catch (error) {
        return { error: "Une erreur ses produite" }
    }
    return { success: "Le nom a était mis à jour" };
};

export const updateFirstName = async (ID: string, FirstName: string) => {
    if (FirstName.length < 3) {
        return { error: "Le prenom doit avoir au minimum 3 charactères" };
    };
    try {
        await db.user.update({
            where: { id: ID },
            data: { firstName: FirstName }
        });
    } catch (error) {
        return { error: "Une erreur ses produite" }
    }
    return { success: "Le prenom a était mis à jour" };
};


export const updateEmail = async (ID: string, Email: string) => { };
export const updatePhone = async (ID: string, Phone: string) => { };
export const updateRole = async (ID: string, Role: string) => { };
export const updateCity = async (ID: string, City: string) => { };
export const updateAdress = async (userID: string, Adress: string) => { };
export const updateZipCode = async (userID: string, ZipCode: string) => { };