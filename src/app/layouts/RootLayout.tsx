import { useIsMobile } from "@/core/hooks/use-mobile";
import { AppSidebar } from "@/app/layouts/sidebar/appSidebar";
import Footer from "@/app/layouts/components/Footer";
import { SidebarInset, SidebarProvider } from "@/core/ui/sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "@/features/header/components/TopBar";
import MainNavigation from "@/features/header/components/MainNavigation";
import SearchBar from "@/features/header/components/SearchBar";

export function RootLayout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      {isMobile && <AppSidebar />}
      <SidebarInset className="flex flex-col min-h-screen">
        <TopBar />

        <header
          className="
          sticky top-0 z-50
          flex h-16 shrink-0 items-center gap-2
          bg-header-bg
          backdrop-blur-[20px]
          border-b border-header-border
          transition-[width,height] ease-linear
          group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
        "
        >
          <div className="container max-w-4/5 mx-auto px-4 py-4">
            <MainNavigation />
          </div>
        </header>

        <SearchBar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
