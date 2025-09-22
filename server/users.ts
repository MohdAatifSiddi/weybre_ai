"use server"

import { auth } from "@/lib/auth";

export const signIn = async () => {
   await auth.api.signInEmail({
    body: {
        email: "mohdaatif@weybre.com",
        password: "mohdaatif",
    }
   })
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "mohdaatif@weybre.com",
            password: "mohdaatif",
            name: "Mohd Aatif",
        }
    })
}