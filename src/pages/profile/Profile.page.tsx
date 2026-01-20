import { Button } from "@/core/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import { useAuth } from "@/features/auth/providers/authProviders";
import { Logout01Icon, UserIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10">
      <Card className="p-4">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">{user.first_name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  className="h-5 w-5 text-muted-foreground"
                />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <HugeiconsIcon
                  icon={UserIcon}
                  className="h-5 w-5 text-muted-foreground"
                />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  ID Utilisateur
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end pt-2">
        <Button
          variant="destructive"
          onClick={() => logout()}
          className="w-full sm:w-auto gap-2"
        >
          <HugeiconsIcon icon={Logout01Icon} className="h-4 w-4" />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
