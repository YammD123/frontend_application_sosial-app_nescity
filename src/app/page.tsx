
import { userLoaderStatus } from "@/loaders/user-loader";
import { redirect } from "next/navigation";

export  default async function Home() {
  const auth = await userLoaderStatus()
  if(!auth){
    redirect("/login")
  }
  else{
    redirect("/content/beranda/home")
  }
  return(
    <>
    </>
  );
}
