import { ApiClient } from "@/lib/api-client"
import { Notification } from "../../type"

export const getNotification = async (): Promise<{data:Notification[]}> => {
    return ApiClient<{data:Notification[]}>({
        url: "/notification",
        method: "GET",

    })
}