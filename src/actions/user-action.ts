"use server";

import { BASE_URL } from "@/lib/base-url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginScema = z.object({
    email: z.string().email("email harus ada"),
    password: z.string().min(4, "password minimal 4 karakter"),
})

const registerScema = z.object({
    name: z.string().min(4, "name minimal 4 karakter"),
    user_name: z.string().min(4, "username minimal 4 karakter"),
    email: z.string().email("email harus ada"),
    password: z.string().min(4, "password minimal 4 karakter"),
})

type ActionState = {
  success: boolean;
  message?: string;
  fieldError?: {
    email?: string;
    password?: string;
    name?: string;
    user_name?: string;
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
            message: "user tidak ditemukan",
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

export const registerAction = async (_prev: ActionState,formData: FormData,) : Promise<ActionState> => {
    const name = formData.get("name");
    const user_name = formData.get("user_name");
    const email = formData.get("email");
    const password = formData.get("password");

    const result = registerScema.safeParse({name, user_name, email, password});

    if(!result.success){
        const zodError = result.error.flatten().fieldErrors;
        return {
            success: false,
            fieldError: {
                name: zodError.name?.[0],
                user_name: zodError.user_name?.[0],
                email: zodError.email?.[0],
                password: zodError.password?.[0],
            }
        }
    }

    const res = await fetch(`${BASE_URL}/user/register`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, user_name, email, password})
    })
    const data = await res.json()
    if(res.status === 409){
        return {
            success: false,
            message:"email sudah terdaftar",
        }
    }
    return {
        success: true,
        message: "berhasil register"
    }
}