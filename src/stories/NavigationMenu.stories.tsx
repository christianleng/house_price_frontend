import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/core/ui/navigation-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Settings01Icon,
  UserCircleIcon,
  Notification01Icon,
} from "@hugeicons/core-free-icons";

const meta = {
  title: "UI/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-150 w-full items-start justify-center pt-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

type HugeIconType = React.ComponentProps<typeof HugeiconsIcon>["icon"];

interface LinkItem {
  title: string;
  href: string;
  description: string;
  icon?: HugeIconType;
}

const gettingStarted: LinkItem[] = [
  {
    title: "Introduction",
    href: "#",
    description: "Re-usable components built using Radix UI and Tailwind CSS.",
  },
  {
    title: "Installation",
    href: "#",
    description: "How to install dependencies and structure your app.",
  },
  {
    title: "Typography",
    href: "#",
    description: "Styles for headings, paragraphs, lists...etc",
  },
];

const components: LinkItem[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
];

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-brand-100/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="#"
                >
                  <HugeiconsIcon icon={Home01Icon} className="h-6 w-6" />
                  <div className="mb-2 mt-4 text-lg font-medium">
                    House Price
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Une plateforme immobilière moderne pour estimer, vendre et
                    acheter.
                  </p>
                </NavigationMenuLink>
              </li>
              {gettingStarted.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
            href="#"
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const SingleDropdown: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Mon Compte</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-50">
              <ListItem href="#" title="Profil" icon={UserCircleIcon}>
                Gérer vos informations
              </ListItem>
              <ListItem href="#" title="Paramètres" icon={Settings01Icon}>
                Préférences du compte
              </ListItem>
              <ListItem
                href="#"
                title="Notifications"
                icon={Notification01Icon}
              >
                Vos alertes immo
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

function ListItem({
  className,
  title,
  children,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  icon?: HugeIconType;
}) {
  return (
    <li>
      <NavigationMenuLink>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-50 hover:text-accent-foreground focus:bg-brand-50 focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && (
              <HugeiconsIcon icon={Icon} className="size-4 text-brand-600" />
            )}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
