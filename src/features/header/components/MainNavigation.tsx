import { useState } from "react";
import { Link } from "react-router-dom";
import { HEADER_NAVIGATION } from "@/core/constant/navigation.constant";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/core/ui/navigation-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FavouriteIcon,
  Home12Icon,
  Notification01Icon,
  PlusSignIcon,
  User03Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/core/ui/button";

const MainNavigation = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between gap-12">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-r from-brand-700 to-brand-400 shadow-brand">
          <HugeiconsIcon icon={Home12Icon} />
        </div>
        <div className="text-2xl font-bold tracking-[-0.5px] text-secondary-foreground">
          House Price
        </div>
      </Link>

      <NavigationMenu value={value} onValueChange={setValue}>
        <NavigationMenuList className="flex items-center gap-2">
          {HEADER_NAVIGATION.map((section) => (
            <NavigationMenuItem key={section.id} value={section.id}>
              <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium">
                {section.trigger}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div
                  className="grid gap-8 p-6"
                  style={{
                    gridTemplateColumns: `repeat(${section.gridCols}, minmax(0, 1fr))`,
                  }}
                >
                  {section.columns.map((column) => (
                    <MenuColumn key={column.title} title={column.title}>
                      {column.links.map((link) => (
                        <MenuLink
                          key={link.label}
                          label={link.label}
                          href={link.href}
                          onNavigate={() => setValue(null)}
                        />
                      ))}
                    </MenuColumn>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

          {["Vendre", "Estimer"].map((label) => (
            <Link
              key={label}
              to="#"
              className="rounded-md px-4 py-2.5 text-[15px] font-medium text-nav-item hover:text-nav-item-hover"
            >
              {label}
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-3">
        <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border hover:bg-icon-btn-hover-bg hover:cursor-pointer">
          <HugeiconsIcon icon={FavouriteIcon} />
          <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground">
            3
          </span>
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border hover:bg-icon-btn-hover-bg hover:cursor-pointer">
          <HugeiconsIcon icon={Notification01Icon} />
        </button>
        <Button className="flex items-center h-full gap-2 rounded-xl bg-linear-to-br from-brand-700 to-brand-300 px-6 py-3 text-sm font-semibold text-white shadow-brand">
          <HugeiconsIcon icon={PlusSignIcon} />
          Déposer une annonce
        </Button>
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border bg-linear-to-br from-muted to-border">
          <HugeiconsIcon icon={User03Icon} />
        </button>
      </div>
    </div>
  );
};

function MenuColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 text-sm font-bold">{title}</div>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function MenuLink({
  label,
  href,
  onNavigate,
}: {
  label: string;
  href: string;
  onNavigate: () => void;
}) {
  return (
    <li className="py-2">
      <Link to={href} onClick={onNavigate} className="text-sm hover:underline">
        {label}
      </Link>
    </li>
  );
}

MainNavigation.displayName = "MainNavigation";
export default MainNavigation;
