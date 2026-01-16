import Footer from "@/app/layouts/components/Footer";
import { Outlet } from "react-router-dom";
import TopBar from "@/features/header/components/TopBar";
import MainNavigation from "@/features/header/components/MainNavigation";
import { lazy, memo, Suspense } from "react";

const SearchBarLazy = lazy(
  () => import("@/features/header/components/SearchBar")
);
const MemoizedTopBar = memo(TopBar);
const MemoizedMainNavigation = memo(MainNavigation);

const RootLayout = () => {
  return (
    <>
      <MemoizedTopBar />

      <header
        className="
          sticky top-0 z-50
          flex h-16 shrink-0 items-center gap-2
          bg-header-bg
          backdrop-blur-[20px]
          border-b border-header-border
        "
      >
        <div className="container max-w-4/5 mx-auto px-4 py-4">
          <MemoizedMainNavigation />
        </div>
      </header>

      <Suspense fallback={<div className="h-12 bg-gray-200 animate-pulse" />}>
        <SearchBarLazy />
      </Suspense>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

RootLayout.displayName = "RootLayout";
export { RootLayout };
