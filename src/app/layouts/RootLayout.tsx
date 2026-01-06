import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">nav</nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © footer
        </div>
      </footer>
    </div>
  );
}
