import { memo } from "react";
import { Outlet, useNavigation } from "react-router";
import TopBar from "@/app/layouts/components/header/TopBar";
import MainNavigation from "@/app/layouts/components/header/MainNavigation";
import SearchBar from "@/features/properties/components/SearchBar";
import Footer from "@/app/layouts/components/Footer";

const MemoizedTopBar = memo(TopBar);
const MemoizedMainNavigation = memo(MainNavigation);
const MemoizedSearchBar = memo(SearchBar);

const RootLayout = () => {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
  const isHomePage = location.pathname === "/";

  const headerContainerClass = isHomePage
    ? "container mx-auto max-w-4/5 px-4"
    : "lg:px-12 px-4";

  return (
    <div className="relative flex min-h-screen flex-col">
      {isNavigating && (
        <div className="fixed top-0 left-0 z-60 h-1 w-full overflow-hidden bg-primary/20">
          <div className="h-full w-full origin-left animate-progress bg-primary" />
        </div>
      )}

      <MemoizedTopBar />

      <header
        className={`${headerContainerClass} transition-all duration-300 bg-header-bg border-header-border sticky top-0 z-50 flex w-full h-16 shrink-0 items-center gap-2 border-b backdrop-blur-[20px]`}
      >
        <MemoizedMainNavigation />
      </header>

      <div className="backdrop-blur-[20px] border-b border-black/5 bg-linear-to-b from-slate-50 to-white py-6">
        <div className={`${headerContainerClass}`}>
          <MemoizedSearchBar />
        </div>
      </div>

      <main
        className={`flex-1 ${headerContainerClass} ${isNavigating ? "opacity-60" : "opacity-100"}`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

RootLayout.displayName = "RootLayout";
export { RootLayout };
