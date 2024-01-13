import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async(email:string, token:string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Confirm Email",
        html:`<p>Click <a href="${confirmLink}">Here</a> to confirm your email</p>`
    });
}


export const sendPasswordResetEmail = async(email:string, token:string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Password Reset Email",
        html:`<p>Click <a href="${resetLink}">Here</a> to reset your password</p>`
    });
}



export const sendTwoFactorTokenEmail = async(email:string, token:string) => {
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"2FA Confirmation code",
        html:`<p>Your 2FA code: ${token}</p>`
    });
}