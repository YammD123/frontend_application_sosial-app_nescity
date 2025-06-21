import { SidebarProvider, SidebarTrigger } from "@/common/shadcn/sidebar";
import { Toaster } from "@/common/shadcn/sonner";
import { NavAppSidebar } from "@/components/navigations/nav-app-sidebar";
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
        <NavAppSidebar user={auth.user} />
        <main className="p-2 w-full">
          <Toaster />
          {children}
          <nav className="flex sticky bottom-0 z-50 items-center justify-between">
            <SidebarTrigger />
          </nav>
        </main>
      </SidebarProvider>
    </>
  );
}
