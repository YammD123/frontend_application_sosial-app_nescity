import { ApiClientMutation } from "@/lib/api-client";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  user_name: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
export type registerDto = z.infer<typeof registerSchema>;



export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(2, "Password minimal 6 karakter"),
});
export type loginDto = z.infer<typeof loginSchema>;



export const registerAction = (data: registerDto) =>{
    return ApiClientMutation<null>({
        url: "/user/register",
        method: "POST",
        data
    })
}

export const loginAction = (data: loginDto) =>{
    return ApiClientMutation<null>({
        url: "/user/login",
        method: "POST",
        data
    })
}