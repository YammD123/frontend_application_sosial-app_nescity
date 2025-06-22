"use server"

import { BASE_URL } from "@/lib/base-url";
import { cookies } from "next/headers";

export const postActionCreate = async(prev:any,formData:FormData)=>{
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }

    const form = new FormData()
    form.append("caption",formData.get("caption")!)
    const media = formData.getAll("media") as File[]
    media.forEach((gambar)=>{
        if(gambar && gambar.size > 0){
            form.append("media",gambar)
        }
    })

    const res = await fetch(`${BASE_URL}/post`,{
        method:"POST",
        headers: {
            cookie: `token=${cookie}`
        },
        body: form
    })
    const data = await res.json()
    return {
        message: "berhasil membuat post",
        success: true
    }
}

export const postActionDelete = async(prev:any,formData:FormData)=>{
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }

    const id = formData.get("id")
    const res = await fetch(`${BASE_URL}/post/${id}`,{
        method:"DELETE",
        headers: {
            cookie: `token=${cookie}`,
            "Content-Type": "application/json"
        },
    })
    const data = await res.json()
    return {
        message: "berhasil menghapus post",
        success: true
    }
}