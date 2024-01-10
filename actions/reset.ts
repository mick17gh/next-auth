"use server"
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { generatePasswordResetToken, generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
export const reset = async (values: z.infer<typeof ResetSchema>)=>{
    const validatedFields = ResetSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "Invalid Fields"}
    }

    const {email} = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return {error: "Email does not exist"}
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

   
     return {success: "Password reset email sent!"};
   
}