
import { userLoaderStatus } from "@/loaders/user-loader";
import { redirect } from "next/navigation";

export default function Home() {
  // const [state, formAction] = useActionState(loginAction, {
  //   message: "",
  //   success: false,
  //   fieldError: {},
  // });

  const auth = userLoaderStatus()
  if(!auth) redirect('/login')
  return(
    <>
    </>
  );
}
