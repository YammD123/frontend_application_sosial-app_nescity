import { BASE_URL } from "@/lib/base-url"
import { cookies } from "next/headers"

export const userLoaderStatus = async ()=>{
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }
    const auth = await fetch(`${BASE_URL}/user`,{
        headers: {
            cookie : `token=${cookie}`
        },
        cache:"no-store"
    })
    const data = await auth.json()
    return data
}

export const userLoaderAllList = async ()=>{
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }
    const auth = await fetch(`${BASE_URL}/user/all`,{
        headers: {
            cookie : `token=${cookie}`
        },
        cache:"no-store"
    })
    const data = await auth.json()
    return data.data
}

export const userLoaderAllRequest = async ()=>{
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }
    const auth = await fetch(`${BASE_URL}/user/request`,{
        headers: {
            cookie : `token=${cookie}`
        },
        cache:"no-store"
    })
    const data = await auth.json()
    return data.data
}

export const userLoaderFollowerById = async (id:string)=>{
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }
    const user = await fetch(`${BASE_URL}/user/follower/${id}`,{
        headers: {
            cookie : `token=${cookie}`
        },
        cache:"no-store"
    })
    const data = await user.json()
    return data.data
}