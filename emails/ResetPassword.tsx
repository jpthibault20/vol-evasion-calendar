import {
    Link,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";
import EmailTemplate from "./Template";

interface ResetPasswordProps {
    magicLink?: string;
}

export const ResetPassword = ({ magicLink }: ResetPasswordProps) => (
    <Tailwind
        config={{
            theme: {
                extend: {
                    colors: {
                        brand: "#007291",
                    },
                },
            },
        }}
    >


        <EmailTemplate preview={"Reinitialisation du mot de passe"}>
            <Section className="my-6">
                <Text className="text-lg leading-6">
                    Vous avez demander une Réinitialisation de votre mot de passe, voici le lien : 
                </Text>
                <Text className="text-lg leading-6">
                    <Link className="text-blue-500" href={magicLink}>
                        👉 Lien de Réinitialisation 👈
                    </Link>
                </Text>
            </Section>
        </EmailTemplate>

    </Tailwind>
);



export default ResetPassword;
