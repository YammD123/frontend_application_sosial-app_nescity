import { BASE_URL } from "@/lib/base-url";

export const postLoaderAll = async () => {
    const res = await fetch(`${BASE_URL}/post/all`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data.data;
}