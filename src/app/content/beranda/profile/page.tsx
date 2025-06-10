import HeaderProfile from "@/components/header-profile"
import { profileLoaderMe } from "@/loaders/profile-loader"

export default async function page() {
  const profileMe = await profileLoaderMe()
  console.log(profileMe);
  return (
    <div className='text-center gap-20 flex-col  flex items-center justify-center'>
      <div className="w-full">
      <HeaderProfile 
      profile={profileMe}
      />
      </div>
      <div className="flex gap-3 flex-row justify-between items-center w-full lg:w-3/4 2xl:w-8/12">
        <div className="bg-amber-400 w-8/12 ">
          ssa
        </div>
        <div className="bg-amber-600 w-full">
          assa
        </div>
      </div>
    </div>
  )
}
