import { BASE_URL } from "@/lib/base-url";

export const commentLoaderGetTotalComment = async (post_id: string) => {
    const res = await fetch(`${BASE_URL}/comment/total/${post_id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch total comments");
    }
    const data = await res.json();
    return data.data;
}

export const commentLoaderGetComments = async (post_id: string) => {
    const res = await fetch(`${BASE_URL}/comment?post_id=${post_id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch comments");
    }
    const data = await res.json();
    return data.data;
}