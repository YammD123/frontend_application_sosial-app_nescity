"use client"

import { CheckCircle, Heart, MessageCircle, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/common/shadcn/avatar"
import { Badge } from "@/common/shadcn/badge"
import { Button } from "@/common/shadcn/button"
import { Card, CardContent } from "@/common/shadcn/card"
const notifications = [
  {
    id: "1",
    sender: {
      name: "Alya",
      avatarUrl: "https://i.pravatar.cc/150?u=alya"
    },
    type: "like",
    message: "Alya menyukai postinganmu",
    timeAgo: "2 menit lalu",
    read: false,
  },
  {
    id: "2",
    sender: {
      name: "Rian",
      avatarUrl: "https://i.pravatar.cc/150?u=rian"
    },
    type: "comment",
    message: "Rian mengomentari postinganmu",
    timeAgo: "10 menit lalu",
    read: true,
  },
  {
    id: "3",
    sender: {
      name: "Nia",
      avatarUrl: "https://i.pravatar.cc/150?u=nia"
    },
    type: "follow",
    message: "Nia mulai mengikuti kamu",
    timeAgo: "1 jam lalu",
    read: false,
  },
]

function getIcon(type: string) {
  switch (type) {
    case "like":
      return <Heart className="w-4 h-4 text-pink-500" />
    case "comment":
      return <MessageCircle className="w-4 h-4 text-blue-500" />
    case "follow":
      return <UserPlus className="w-4 h-4 text-green-500" />
    default:
      return null
  }
}

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Notifikasi</h1>

      {notifications.length === 0 ? (
        <p className="text-muted-foreground text-sm">Tidak ada notifikasi.</p>
      ) : (
        notifications.map((notif) => (
          <Card key={notif.id}>
            <CardContent className="flex items-start gap-4 p-4">
              <Avatar>
                <AvatarImage src={notif.sender.avatarUrl} />
                <AvatarFallback>
                  {notif.sender.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getIcon(notif.type)}
                  <p className="text-sm">{notif.message}</p>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{notif.timeAgo}</div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {!notif.read && <Badge variant="outline">Baru</Badge>}
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


