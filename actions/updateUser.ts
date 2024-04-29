"use server"

import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail, getUserById } from "@/data/user";
import { getAdressById } from "./user";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { generateVerificationToken } from "@/lib/tokens";

interface dataInterface {
    name: string,
    Prenom: string,
    email: string,
    phone: string,
    adress: string,
    adressCity: string,
    adressZipCode: string,
    adressCountry: string,
    Role: UserRole,
}

export const updateUserAction = async (userID: string, adressID: string, data: dataInterface) => {
    // console.log("user id : ", userID);
    // console.log("adress id : ", adressID);
    // console.log("data : ", data.Role);

    const dataUser = await getUserById(userID);
    const dataAdress = await getAdressById(adressID);

    if (data.name != dataUser?.name && data.name != null) {
        const res = await updateName(userID, data.name);

        if (res.error) {
            console.log(res);
            return { error: "Oups, une erreur s'est produite." }
        }
    };

    if (data.Prenom != dataUser?.firstName && data.Prenom != null) {
        const res = await updateFirstName(userID, data.Prenom);

        if (res.error) {
            console.log(res);
            return { error: "Oups, une erreur s'est produite." }
        }
    };

    if (data.email != dataUser?.email && data.email != null) {
        const res = await updateEmail(userID, data.email);

        if (res.error) {
            console.log(res);
            return { error: "Oups, une erreur s'est produite." };
        }
    };

    if (data.phone != dataUser?.phone) {
        const res = await updatePhone(userID, data.phone);

        if (res.error) {
            console.log(res);
            return { error: "Oups, une erreur s'est produite." };
        }
    };

    if (data.Role != dataUser?.role && data.Role) {
        const res = await updateRole(userID, data.Role);

        if (res.error) {
            console.log(res);
            return { error: "Oups, une erreur s'est produite." };
        }
    };

    if (data.adressCity != dataAdress?.city && data.adressCity) {
        const res = await updateCity(adressID, data.adressCity);

        if (res.error) {
            console.log(res);
            return { error: "Oups, une erreur s'est produite." };
        }
    };

    if (data.adress != dataAdress?.adress && data.adress) {
        const res = await updateAdress(adressID, data.adress);

        if (res.error) {
            console.log(res);
            return { error: "Oups, une erreur s'est produite." };
        }
    };

if (data.adressZipCode != dataAdress?.zipCode && data.adressZipCode) {
    const res = await updateZipCode(adressID, data.adressZipCode);

    if (res.error) {
        console.log(res);
        return { error: "Oups, une erreur s'est produite." };
    }
};

if (data.adressCountry != dataAdress?.country && data.adressCountry) {
    const res = await updateCountry(adressID, data.adressCountry);

    if (res.error) {
        console.log(res);
        return { error: "Oups, une erreur s'est produite." };
    }
};

return { success: "Utilisateur mis à jour" }
};


export const updateName = async (ID: string, Name: string) => {
    if (Name.length >= 3) {
        try {
            await db.user.update({
                where: { id: ID },
                data: { name: Name }
            });
        } catch (error) {
            return { error: "Oups, une erreur s'est produite." }
        }
        return { success: "Le nom a été mis à jour." };
    };

    return { error: "Le nom doit avoir au minimum 3 caractères." };

};

export const updateFirstName = async (ID: string, FirstName: string) => {
    if (FirstName.length >= 3) {
        try {
            await db.user.update({
                where: { id: ID },
                data: { firstName: FirstName }
            });
        } catch (error) {
            return { error: "Oups, une erreur s'est produite." }
        }
        return { success: "Le prenom a été mis à jour." };
    };

    return { error: "Le prénom doit avoir au minimum 3 caractères." };

};

export const updateEmail = async (ID: string, Email: string) => {
    if (Email.includes("@") && Email.includes(".") && Email.length >= 8) {

        const existingUser = await getUserByEmail(Email);

        if (existingUser && existingUser.id !== ID) {
          return { error: "Mail déja utilisé" }
        }
        const verificationToken = await generateVerificationToken( Email, ID );
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token,
        );
        
        return { success: "Mail de vérification envoyé !" };
    }
    return { error: "Le mail n'est pas valide." }
};

export const updatePhone = async (ID: string, Phone: string) => {
    if (!isNaN(Number(Phone)) && Phone.length == 10) {
        try {
            await db.user.update({
                where: { id: ID },
                data: { phone: Phone }
            });
        } catch (error) {
            return { error: "Oups, une erreur s'est produite." }
        }

        return { success: "Le téléphone a été mis à jour." };
    }
    return { error: "Le téléphone n'est pas valide." }
};

export const updateRole = async (ID: string, Role: UserRole) => {
    if (Role in UserRole) {
        try {
            await db.user.update({
                where: { id: ID },
                data: { role: Role as UserRole }
            });
        } catch (error) {
            return { error: "Oups, une erreur s'est produite." }
        }

        return { success: "Le role a été mis à jour." };
    }
    return { error: "Le role n'est pas valide." }
};

export const updateCity = async (ID: string, City: string) => {
    if (City) {
        try {
            await db.address.update({
                where: { id: ID },
                data: { city: City }
            });
        } catch (error) {
            return { error: "Oups, une erreur s'est produite." }
        }

        return { success: "La ville a été mis à jour." };
    }
    return { error: "La ville n'est pas valide." }
};

export const updateAdress = async (ID: string, Adress: string) => {
    if (Adress) {
        try {
            await db.address.update({
                where: { id: ID },
                data: { adress: Adress }
            });
        } catch (error) {
            return { error: "Oups, une erreur s'est produite." }
        }

        return { success: "L'adresse a été mis à jour." };
    }
    return { error: "L'adresse n'est pas valide." }
};

export const updateZipCode = async (ID: string, ZipCode: string) => { 
    if (!isNaN(Number(ZipCode))) {
        try {
            await db.address.update({
                where: { id: ID },
                data: { zipCode: ZipCode }
            });
        } catch (error) {
            return { error: "Oups, une erreur s'est produite." }
        }

        return { success: "Le code postale a été mis à jour." };
    }
    return { error: "Le code postale n'est pas valide." }
};

export const updateCountry = async (ID: string, Country: string) => {
    if (Country) {
        try {
            await db.address.update({
                where: { id: ID },
                data: { country: Country }
            });
        } catch (error) {
            return { error: "Oups, une erreur s'est produite." }
        }

        return { success: "Le pays a été mis à jour." };
    }
    return { error: "Le pays n'est pas valide." }
}