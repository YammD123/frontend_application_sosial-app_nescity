import React from 'react'
interface Props {
  postDetail: {
    id: string;
    caption: string;
    created_at: string;
    media: {
      id: string;
      url: string;
      type: string;
    }[];
    user: {
      profile: {
        name: string;
        avatar_image: string;
      };
    };
    like: {
      id: string;
      user_id: string;
      post_id: string;
    }[];
  }
  auth: {
    user: {
      id: string;
    };
  };
}

export default function UserPostPetailPost({auth,postDetail}: Props) {
  return (
    <div>user-post-detail-post</div>
  )
}
