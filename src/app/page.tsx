
import { userLoaderStatus } from "@/loaders/user-loader";
import { redirect } from "next/navigation";

export  default async function Home() {
  // const [state, formAction] = useActionState(loginAction, {
  //   message: "",
  //   success: false,
  //   fieldError: {},
  // });

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
