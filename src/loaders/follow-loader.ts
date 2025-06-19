"use server";

import { BASE_URL } from "@/lib/base-url";
import { cookies } from "next/headers";

export async function followLoaderGetFollowers(page:string="1"){
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    if(!cookie){
        return null
    }
    const res = await fetch(`${BASE_URL}/follower/followers?page=${page}`,{
        headers: {
            cookie : `token=${cookie}`
        },
        cache:"no-store"
    });
    const data = await res.json();
    return data
}