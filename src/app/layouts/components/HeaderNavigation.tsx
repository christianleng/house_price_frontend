import { useState } from "react";
import { HEADER_NAVIGATION } from "@/core/constant/navigation.constant";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/core/ui/navigation-menu";
import { Link } from "react-router-dom";

export function HeaderNavigationMenu() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <NavigationMenu value={value} onValueChange={setValue}>
      <NavigationMenuList className="flex gap-2">
        {HEADER_NAVIGATION.map((section) => (
          <NavigationMenuItem key={section.id} value={section.id}>
            <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium">
              {section.trigger}
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <div className="grid gap-8 p-6 md:w-175 md:grid-cols-3">
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}

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
