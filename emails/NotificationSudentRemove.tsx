import {
    Link,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";
import EmailTemplate from "./Template";

interface NotificationSudentRemoveProps {
    startDate: string;
    endDate: string
}

export const NotificationSudentRemove = ({ startDate, endDate}: NotificationSudentRemoveProps) => (
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


        <EmailTemplate preview={"Oups une heure à était annulé"}>
            <Section className="my-6">
                <Text className="text-lg leading-6">
                    Mauvaise nouvelle, Votre vol : 
                </Text>
                <Text className="text-lg leading-6">
                    {startDate} ➡️ {endDate}
                </Text>
                <Text className="text-lg leading-6">
                    Doit être annulé, n&apos;hesité pas réserver une nouvelle heure
                </Text>
            </Section>
        </EmailTemplate>

    </Tailwind>
);



export default NotificationSudentRemove;
