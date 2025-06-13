import { SidebarProvider, SidebarTrigger } from "@/common/shadcn/sidebar";
import { Toaster } from "@/common/shadcn/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/toggle-dark";
import { userLoaderStatus } from "@/loaders/user-loader";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await userLoaderStatus();
  if (!auth?.user) {
    redirect("/login");
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar user={auth.user} />
        <main className="p-2 w-full">
          <SidebarTrigger />
          <ModeToggle />
          <Toaster />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
