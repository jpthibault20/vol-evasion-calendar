import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });
};

export const sendNotificationBooking = async (email: string, studentFirstname: string, studentLastname: string, startDate: Date, endDate: Date) => {
  const formatedStartDate = startDate.toLocaleString('fr-FR');
  const formatedEndDate = endDate.toLocaleString('fr-FR');

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: "vol Réservé",
    html: `<p>${studentFirstname} ${studentLastname} à réservé un vol : ${formatedStartDate} -> ${formatedEndDate}</p>`
  });
}

export const sendStudentNotificationBooking = async (email: string, startDate: Date, endDate: Date) => {
  const formatedStartDate = startDate.toLocaleString('fr-FR');
  const formatedEndDate = endDate.toLocaleString('fr-FR');

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: "vol Réservé",
    html: `<p>Vous etes inscrit à un vol : ${formatedStartDate} -> ${formatedEndDate}</p>`
  });
}