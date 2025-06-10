"use server"

import { BASE_URL } from "@/lib/base-url"
import { cookies } from "next/headers"

export const profileLoaderMe = async()=>{
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }
    const res = await fetch(`${BASE_URL}/profile`,{
        headers:{
            cookie : `token=${cookie}`
        },
        cache:"no-store"
    })
    const data = await res.json()
    return data.data
}