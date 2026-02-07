import { useAuth } from "@/features/auth/providers/authProviders";
import { UserFavorites } from "@/features/profile/components/UserFavorites";
import { UserProfileCard } from "@/features/profile/components/UserProfileCard";
import { Suspense } from "react";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-4/5 px-4 py-10 space-y-12">
      <section>
        <UserProfileCard user={user} onLogout={logout} />
      </section>

      <section className="space-y-6">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-2 h-20 bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <UserFavorites />
        </Suspense>
      </section>
    </div>
  );
};

export default ProfilePage;
