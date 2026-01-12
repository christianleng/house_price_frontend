import { useIsMobile } from "@/core/hooks/use-mobile";
import { AppSidebar } from "@/app/layouts/sidebar/appSidebar";
import Footer from "@/app/layouts/components/Footer";
import Header from "@/app/layouts/components/Header";
import { SidebarInset, SidebarProvider } from "@/core/ui/sidebar";
import { Outlet } from "react-router-dom";
import Search from "@/features/search/Search";
import { Separator } from "@/core/ui/separator";

export function RootLayout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      {isMobile && <AppSidebar />}
      <SidebarInset className="flex flex-col min-h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <Header />
        </header>

        <Search />

        <Separator />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
