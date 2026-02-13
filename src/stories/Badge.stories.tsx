import type { Meta, StoryObj } from "@storybook/react-vite";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon, PlusSignIcon, StarIcon } from "@hugeicons/core-free-icons";
import { Badge } from "@/core/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "pill",
        "pillActive",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge Default",
    variant: "default",
  },
};

export const States: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const BadgeExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        Badge utilisés pour les filtres rapides :
      </p>
      <div className="flex flex-wrap gap-3">
        <Badge
          variant="pill"
          size="default"
          render={(props) => <button {...props} />}
        >
          <HugeiconsIcon icon={Home01Icon} className="mr-1.5" />
          Avec jardin
        </Badge>

        <Badge
          variant="pill"
          size="default"
          render={(props) => <button {...props} />}
        >
          <HugeiconsIcon icon={StarIcon} className="mr-1.5" />
          Coup de cœur
        </Badge>

        <Badge
          variant="pill"
          size="default"
          className="border-dashed text-gray-500"
          render={(props) => <button {...props} />}
        >
          <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-3" />
          Plus de filtres
        </Badge>
      </div>
    </div>
  ),
};
