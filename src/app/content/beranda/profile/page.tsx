import HeaderProfile from "@/components/header-profile"
import InfoProfile from "@/components/info-profile";
import NotFoundPost from "@/components/not-found-post";
import PostProfile from "@/components/post-profile";
import { postLoaderMe } from "@/loaders/post-loader";
import { profileLoaderMe } from "@/loaders/profile-loader"

export default async function page() {
  const profileMe = await profileLoaderMe()
  const postMe = await postLoaderMe()
  return (
    <div className='text-center gap-20 flex-col  flex items-center justify-center'>
      <div className="w-full">
      <HeaderProfile 
      profile={profileMe}
      />
      </div>
      <div className="flex gap-3 flex-row justify-between  w-full lg:w-3/4 2xl:w-8/12">
        <div className="w-8/12 ">
        <InfoProfile 
        profile={profileMe}
        />
        </div>
        <div className="w-full">
          {postMe && postMe.length > 0 ?(
            <PostProfile />
          ):(
            <NotFoundPost />
          )}
        </div>
      </div>
    </div>
  )
}
