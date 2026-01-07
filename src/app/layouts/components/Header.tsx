import { HugeiconsIcon } from "@hugeicons/react";
import { useIsMobile } from "../../../core/hooks/use-mobile";
import { SidebarTrigger } from "../../../core/ui/sidebar";
import {
  FavouriteIcon,
  Login01Icon,
  Notification01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "../../../core/ui/button";
import { Link } from "react-router-dom";
import { IconButton } from "../../../core/components/icon-button";
import { HeaderNavigationMenu } from "./HeaderNavigation";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto px-4 py-4">
      <nav className="flex justify-between">
        <div className="flex items-center">
          {isMobile && <SidebarTrigger className="-ml-1" />}
          <Link to="/">House Price</Link>
        </div>
        {!isMobile && <HeaderNavigationMenu />}
        <div className="flex md:gap-6 items-center">
          {!isMobile && (
            <Button size={"lg"} className="rounded-3xl font-bold">
              <HugeiconsIcon icon={PlusSignIcon} />
              Déposer une annonce
            </Button>
          )}
          <IconButton icon={Notification01Icon} />
          <IconButton icon={FavouriteIcon} />
          <IconButton icon={Login01Icon} />
        </div>
      </nav>
    </div>
  );
};

export default Header;
