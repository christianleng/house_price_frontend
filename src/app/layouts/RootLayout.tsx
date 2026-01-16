import { memo } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import TopBar from "@/features/header/components/TopBar";
import MainNavigation from "@/features/header/components/MainNavigation";
import SearchBar from "@/features/header/components/SearchBar";
import Footer from "@/app/layouts/components/Footer";

const MemoizedTopBar = memo(TopBar);
const MemoizedMainNavigation = memo(MainNavigation);
const MemoizedSearchBar = memo(SearchBar);

const RootLayout = () => {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <div className="relative flex min-h-screen flex-col">
      {isNavigating && (
        <div className="fixed top-0 left-0 z-60 h-1 w-full overflow-hidden bg-primary/20">
          <div className="h-full w-full origin-left animate-progress bg-primary" />
        </div>
      )}

      <MemoizedTopBar />

      <header
        className="
          bg-header-bg border-header-border sticky top-0 z-50
          flex h-16 shrink-0 items-center gap-2
          border-b backdrop-blur-[20px]
        "
      >
        <div className="container mx-auto max-w-4/5 px-4">
          <MemoizedMainNavigation />
        </div>
      </header>

      <div className="bg-header-bg border-b border-header-border">
        <MemoizedSearchBar />
      </div>

      <main
        className={`flex-1 transition-opacity duration-300 ${
          isNavigating ? "opacity-60" : "opacity-100"
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

RootLayout.displayName = "RootLayout";
export { RootLayout };
