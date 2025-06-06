import { SidebarProvider, SidebarTrigger } from "@/common/shadcn/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/toggle-dark";
import { userLoaderStatus } from "@/loaders/user-loader";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const auth = await userLoaderStatus()
    return (
        <>
                <SidebarProvider

        >
            
        <AppSidebar user={auth.user} />
        <main className="p-2 w-full">
          <SidebarTrigger />
          <ModeToggle />
        {children}
        </main>
        </SidebarProvider>
        </>
    )
}