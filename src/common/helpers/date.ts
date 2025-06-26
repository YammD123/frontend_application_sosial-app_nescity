import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function timeAgo(date: string) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale:id
    })
}