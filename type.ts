export type User = {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;

    //relasi
    profile:Profile
    post:Post[]
    like:Like[]
    receiverNotification:Notification[]
    senderNotification:Notification[]
};

export type Profile = {
    id: string;
    user_name: string;
    name: string;
    email: string;
    bio: string;
    website: string;
    pendidikan: string;
    pekerjaan: string;
    gender: string;
    tanggal_lahir: string;
    avatar_image: string;
    cover_image: string;
    alamat: string;
    user_id: string;

    //relasi
    user:User
};

export type Post = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: string;

    //relasi
    user:User
    media:Media[]
}

export type Media = {
    id: string;
    url: string;
    type: string;

    //relasi
    post:Post
    like:Like[]
};

export type Like = {
    id: string;
    post_id: string;
    user_id: string;

    //relasi
    post:Post
    user:User
};

enum NotificationType {
  follow_request = "follow_request",
  follow_accept = "follow_accept",
  follow_reject = "follow_reject",
  post_like = "post_like",
  post_comment = "post_comment",
  post_comment_reply = "post_comment_reply"
}

export type Notification = {
    id:string;
    type:NotificationType;
    message:string;
    is_read:string;
    created_at:string;
    user_id:string;
    receiver_id:string;

    receiver:User
    sender:User
}