import { BASE_URL } from "@/lib/base-url";
import { cookies } from "next/headers";

export const postLoaderAll = async () => {
    const res = await fetch(`${BASE_URL}/post/all`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data.data;
}

export const postLoaderMe = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("token")?.value;
    if (!cookie) {
        return null;
    }
    const res = await fetch(`${BASE_URL}/post`, {
        cache: "no-store",
        headers: {
            cookie: `token=${cookie}`,
        }
    });
    const data = await res.json();
    return data.data
}

export const postLoaderDetail = async (id: string) => {
    const res = await fetch(`${BASE_URL}/post/${id}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data.data;
}