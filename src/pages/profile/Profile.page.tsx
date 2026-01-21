import { useAuth } from "@/features/auth/providers/authProviders";
import { UserFavorites } from "@/features/profile/components/UserFavorites";
import { UserProfileCard } from "@/features/profile/components/UserProfileCard";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-4/5 px-4 py-10 space-y-12">
      <section>
        <UserProfileCard user={user} onLogout={logout} />
      </section>

      <section className="space-y-6">
        <UserFavorites />
      </section>
    </div>
  );
};

export default ProfilePage;
