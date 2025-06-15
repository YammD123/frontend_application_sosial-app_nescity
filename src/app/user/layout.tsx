import { SidebarProvider, SidebarTrigger } from "@/common/shadcn/sidebar";
import { Toaster } from "@/common/shadcn/sonner";
import { UserSidebar } from "@/components/user-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <UserSidebar/>
        <main className="p-2 w-full">
          <nav className="flex sticky top-0 z-50 items-center justify-between">        
          <SidebarTrigger />
          </nav>
          <Toaster />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
