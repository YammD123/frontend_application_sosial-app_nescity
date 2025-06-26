export type User = {
    id: string;
    email: string;
    avatar: string;
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


export type Notification = {
    id:string;
    type:string;
    message:string;
    is_read:string;
    created_at:string;
    user_id:string;
    receiver_id:string;

    receiver:User
    sender:User
}