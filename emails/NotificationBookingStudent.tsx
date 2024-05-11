import {
    Link,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";
import EmailTemplate from "./Template";

interface NotificationBookingStudentProps {
    startDate: string;
    endDate: string
}

export const NotificationBookingStudent = ({startDate, endDate}: NotificationBookingStudentProps) => (
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


        <EmailTemplate preview={"Inscription à une heure de vol"}>
            <Section className="my-6">
                <Text className="text-lg leading-6">
                    Vous etes inscrit à une nouvelle heure de vol : 
                </Text>
                <Text className="text-lg leading-6">
                    {startDate} ➡️ {endDate}
                </Text>
                <Text className="text-lg leading-6">Information: Il faut prévoir 30 min avant le vol et 15 min après le vol</Text>
            </Section>
        </EmailTemplate>

    </Tailwind>
);



export default NotificationBookingStudent;
