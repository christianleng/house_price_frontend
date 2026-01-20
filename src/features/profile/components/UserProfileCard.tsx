import { memo } from "react";
import { Button } from "@/core/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import { Logout01Icon, UserIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { User } from "@/features/auth/types/auth.types";

interface UserProfileCardProps {
  user: User;
  onLogout: () => void;
}

export const UserProfileCard = memo(
  ({ user, onLogout }: UserProfileCardProps) => (
    <Card className="p-4 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl font-bold">{user.first_name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10"
        >
          <HugeiconsIcon icon={Logout01Icon} className="h-4 w-4" />
          Déconnexion
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-3 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={Mail01Icon}
              className="h-4 w-4 text-muted-foreground"
            />
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={UserIcon}
              className="h-4 w-4 text-muted-foreground"
            />
            <span className="text-sm font-mono text-muted-foreground">
              {user.id}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
);

UserProfileCard.displayName = "UserProfileCard";
