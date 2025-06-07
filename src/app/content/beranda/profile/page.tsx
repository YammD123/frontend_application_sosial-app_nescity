import { profileLoader } from "@/loaders/profile-loader"

export default async function page() {
  const profileMe = await profileLoader()
  return (
    <div>page</div>
  )
}
