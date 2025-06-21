import { SidebarProvider, SidebarTrigger } from "@/common/shadcn/sidebar";
import { Toaster } from "@/common/shadcn/sonner";
import { UserSidebar } from "@/components/navigations/nav-user-sidebar";
import { followLoaderGetFollowers } from "@/loaders/follow-loader";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <UserSidebar />
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
