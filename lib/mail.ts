import MagicLinkEmail from "@/emails/MagicLink";
import NotificationBookingPilote from "@/emails/NotificationBookingPilote";
import NotificationBookingStudent from "@/emails/NotificationBookingStudent";
import NotificationSudentRemove from "@/emails/NotificationSudentRemove"
import NotificationSudentRemoveForPilot from "@/emails/NotificationSudentRemoveForPilot"
import ResetPassword from "@/emails/ResetPassword";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'stephane@vol-evasion.fr',
    to: email,
    subject: "Réinitialisation mot de passe",
    react: ResetPassword({magicLink: resetLink})
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: 'stephane@vol-evasion.fr',
    to: email,
    subject: "Confirmation de votre compte",
    react: MagicLinkEmail({magicLink: confirmLink})
  });
};

export const sendNotificationBooking = async (email: string, studentFirstname: string, studentLastname: string, startDate: Date, endDate: Date) => {
  const formatedStartDate = startDate.toLocaleString('fr-FR');
  const formatedEndDate = endDate.toLocaleString('fr-FR');

  await resend.emails.send({
    from: 'stephane@vol-evasion.fr',
    to: email,
    subject: "Un élève s'est inscrit un vol",
    react: NotificationBookingPilote({startDate: formatedStartDate, endDate: formatedEndDate, name: studentLastname, firstName: studentFirstname})
  });
}

export const sendStudentNotificationBooking = async (email: string, startDate: Date, endDate: Date) => {
  const formatedStartDate = startDate.toLocaleString('fr-FR');
  const formatedEndDate = endDate.toLocaleString('fr-FR');

  await resend.emails.send({
    from: 'stephane@vol-evasion.fr',
    to: email,
    subject: "Confirmation de votre inscription a un vol",
    react: NotificationBookingStudent({startDate: formatedStartDate, endDate: formatedEndDate})
  });
}

export const sendNotificationRemoveAppointment = async (email: string, startDate: Date, endDate: Date) => {
  const formatedStartDate = startDate.toLocaleString('fr-FR');
  const formatedEndDate = endDate.toLocaleString('fr-FR');

  await resend.emails.send({
    from: 'stephane@vol-evasion.fr',
    to: email,
    subject: "vol annulé",
    react: NotificationSudentRemove({startDate: formatedStartDate, endDate: formatedEndDate})
  });

}

export const sendNotificationSudentRemoveForPilot = async (email: string, startDate: Date, endDate: Date) => {
  const formatedStartDate = startDate.toLocaleString('fr-FR');
  const formatedEndDate = endDate.toLocaleString('fr-FR');

  await resend.emails.send({
    from: 'stephane@vol-evasion.fr',
    to: email,
    subject: "vol annulé",
    react: NotificationSudentRemoveForPilot({startDate: formatedStartDate, endDate: formatedEndDate})
  });
}