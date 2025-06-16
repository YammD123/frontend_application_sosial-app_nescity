"use server"
import { BASE_URL } from "@/lib/base-url"
import { cookies } from "next/headers"

export const followActionSend = async (prev:any,formData:FormData) => {
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }

    const receiver_id = formData.get("receiver_id")
    const res = await fetch(`${BASE_URL}/follow-request/send`,{
        method:"POST",
        headers: {
            cookie: `token=${cookie}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            receiver_id
        })
    })
    const data = await res.json()
    return {
        message: "berhasil mengirim permintaan",
        success: true
    }
}

export const followActionAccept = async (prev:any,formData:FormData) => {
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }

    const receiver_id = formData.get("receiver_id")
    const res = await fetch(`${BASE_URL}/follow-request/accept`,{
        method:"POST",
        headers: {
            cookie: `token=${cookie}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            receiver_id
        })
    })
    const data = await res.json()
    return {
        message: "permintaan permintaan berhasil diterima",
        success: true
    }
}


export const followActionReject = async (prev:any,formData:FormData) => {
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }

    const receiver_id = formData.get("receiver_id")
    const res = await fetch(`${BASE_URL}/follow-request/reject`,{
        method:"DELETE",
        headers: {
            cookie: `token=${cookie}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            receiver_id
        })
    })
    const data = await res.json()
    return {
        message: "permintaan ditolak",
        success: true
    }
}

