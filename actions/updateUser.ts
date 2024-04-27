"use server"


import { z } from "zod"



export const updateUserAction = async (userID: string, adressID: string, data: any = {}) => {
    console.log("user id : ", userID);
    console.log("adress id : ", adressID);
    console.log("data : ", data);

    const {firstName} = data;
    if (firstName) {
        return {error: "test"}
    };

    const {name} = data;
    if (name) {
        
    };

    const {email} = data;
    if (email) {
        
    };

    const {phone} = data;
    if (phone) {
        
    };

    const {role} = data;
    if (role) {
        
    };

    const {adressCity} = data;
    if (adressCity) {
        
    };

    const {adressCountry} = data;
    if (adressCountry) {
        
    };

    const {adressNumber} = data;
    if (adressNumber) {
        
    };

    const {adressStreet} = data;
    if (adressStreet) {
        
    };


    const {adressZipCode} = data;
    if (adressZipCode) {
        
    };
    
    return {success: "Utilisateur mis à jour"}
};
