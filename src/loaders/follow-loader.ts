"use server";

import { BASE_URL } from "@/lib/base-url";
import { cookies } from "next/headers";

async function followLoaderGetFollowers(){
    const cookieStore = await cookies()
    const cookie = cookieStore.get("token")?.value
    const res = await fetch(`${BASE_URL}/follow/followers`,{
        headers: {
            cookie : `token=${cookie}`
        },
        cache:"no-store"
    });
    const data = await res.json();
    return data.data
}