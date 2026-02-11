import type { Meta, StoryObj } from "@storybook/react-vite";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/core/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Bouton par défaut",
    variant: "default",
    size: "default",
  },
};

export const BrandAction: Story = {
  render: (args) => (
    <Button
      {...args}
      className="flex items-center gap-2 rounded-xl bg-linear-to-br from-brand-700 to-brand-300 px-6 py-3 text-sm font-semibold text-white shadow-brand"
    >
      <HugeiconsIcon icon={PlusSignIcon} />
      <span>Déposer une annonce</span>
    </Button>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    variant: "default",
    children: (
      <span className="flex items-center gap-2">
        <HugeiconsIcon icon={Search01Icon} />
        Rechercher
      </span>
    ),
  },
};
