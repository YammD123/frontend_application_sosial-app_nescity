"use server";

import { BASE_URL } from "@/lib/base-url";
import { cookies } from "next/headers";
import { z } from "zod";

const loginScema = z.object({
    email: z.string().email("email harus ada"),
    password: z.string().min(4, "password minimal 6 karakter"),
})

type ActionState = {
  success: boolean;
  message?: string;
  fieldError?: {
    email?: string;
    password?: string;
  };
};

export const loginAction = async (_prev: ActionState,formData: FormData,) : Promise<ActionState> => {
    const email = formData.get("email");
    const password = formData.get("password");

    const result = loginScema.safeParse({email, password});

    if(!result.success){
        const zodError = result.error.flatten().fieldErrors;
        return {
            success: false,
            fieldError: {
                email: zodError.email?.[0],
                password: zodError.password?.[0],
            }
        }
    }

    const res = await fetch(`${BASE_URL}/user/login`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    })
    if(res.status === 404){
        return {
            success: false,
            fieldError: {
                email: "email tidak ditemukan",
            }
        }
    }
    if(res.status === 400){
        return {
            success: false,
            fieldError: {
                password: "password salah",
            }
        }
    }
    const data = await res.json()
    const token = data.acces_token;
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30
    })
    return {
        success: true,
        message:"berhasil login"
    }
}