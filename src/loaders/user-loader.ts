import { BASE_URL } from "@/lib/base-url"
import { cookies } from "next/headers"

export const userLoaderStatus = async ()=>{
    const cookie = (await cookies()).get('token')?.value
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