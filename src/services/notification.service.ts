import { ApiClient } from "@/lib/api-client"
import { cookies } from "next/headers"

export const getNotification = async (): Promise<{data:Notification[]}> => {
    "use server"
    const cookiesStore = await cookies()
    const cookie = cookiesStore.get("token")?.value
    return ApiClient<{data:Notification[]}>({
        url: "/notification",
        method: "GET",
        headers: {
            cookie: `token=${cookie}`
        }
    })
}