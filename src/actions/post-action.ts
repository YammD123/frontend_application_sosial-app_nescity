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
    const media = formData.get("media")
    if(media && (media as File).size > 0){
        form.append("media",media)
    }

    // const res = await fetch(`${BASE_URL}/post`,{
    //     method:"POST",
    //     headers: {
    //         cookie: `token=${cookie}`
    //     },
    //     body: form
    // })
    // const data = await res.json()
    return {
        message: "berhasil membuat post",
        success: true
    }
}