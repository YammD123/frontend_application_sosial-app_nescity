"use client"

import { CheckCircle, Heart, MessageCircle, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/common/shadcn/avatar"
import { Badge } from "@/common/shadcn/badge"
import { Button } from "@/common/shadcn/button"
import { Card, CardContent } from "@/common/shadcn/card"
import { useQuery } from "@tanstack/react-query"
import { getNotification } from "@/services/notificationService"
import { timeAgo } from "@/common/helpers/date"

function getIcon(type: string) {
  switch (type) {
    case "like":
      return <Heart className="w-4 h-4 text-pink-500" />
    case "post_comment":
      return <MessageCircle className="w-4 h-4 text-blue-500" />
    case "post_comment_reply":
      return <MessageCircle className="w-4 h-4 text-blue-500" />
    case "follow_request":
      return <UserPlus className="w-4 h-4 text-yellow-500" />
    case "follow_accept":
      return <UserPlus className="w-4 h-4 text-green-500" />
    case "follow_reject":
      return <UserPlus className="w-4 h-4 text-red-500" />
    default:
      return null
  }
}

export default function NotificationsPage() {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey:["notifications"],
    queryFn: getNotification
  })
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Notifikasi</h1>

      {notifications?.data.length === 0 ? (
        <p className="text-muted-foreground text-sm">Tidak ada notifikasi.</p>
      ) : (
        notifications?.data.map((notif) => (
          <Card key={notif.id}>
            <CardContent className="flex items-start gap-4 p-4">
              <Avatar>
                <AvatarImage src={notif.sender.profile.avatar_image} />
                <AvatarFallback>
                  {notif.sender.profile.name}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getIcon(notif.type)}
                  <p className="text-sm">{notif.message}</p>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{timeAgo(notif.created_at)}</div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {!notif.is_read && <Badge variant="outline">Baru</Badge>}
                <Button variant="ghost" size="icon">
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}


