import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "@/core/ui/Chip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  StarIcon,
  PlusSignIcon,
  VideoReplayIcon,
  Tick02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

const meta = {
  title: "UI/Chip",
  component: Chip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "active", "dashed", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "icon"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Chip Default",
    variant: "outline",
  },
};

export const FilterRow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip variant="outline">
        <HugeiconsIcon icon={Home01Icon} />
        Avec jardin
      </Chip>

      <Chip variant="active">
        <HugeiconsIcon icon={StarIcon} />
        Coup de cœur
      </Chip>

      <Chip variant="outline">
        <HugeiconsIcon icon={SparklesIcon} />
        Neuf
      </Chip>

      <Chip variant="outline">
        <HugeiconsIcon icon={VideoReplayIcon} />
        Visite virtuelle
      </Chip>

      <Chip variant="dashed">
        <HugeiconsIcon icon={PlusSignIcon} className="size-3" />
        Plus de filtres
      </Chip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium text-gray-500">Outline</span>
        <Chip size="xs" variant="outline">
          Outline
        </Chip>
        <Chip variant="outline">
          <HugeiconsIcon icon={Home01Icon} /> With Icon
        </Chip>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium text-gray-500">Active</span>
        <Chip size="xs" variant="active">
          Active
        </Chip>
        <Chip variant="active">
          <HugeiconsIcon icon={Tick02Icon} /> Selected
        </Chip>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium text-gray-500">Dashed</span>
        <Chip size="xs" variant="dashed">
          Dashed
        </Chip>
        <Chip variant="dashed">
          <HugeiconsIcon icon={PlusSignIcon} /> Add Filter
        </Chip>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium text-gray-500">Ghost</span>
        <Chip variant="ghost">Ghost</Chip>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Chip size="xs" variant="outline">
        XS
      </Chip>
      <Chip size="sm" variant="outline">
        Small
      </Chip>
      <Chip size="md" variant="outline">
        Medium (Default)
      </Chip>
      <Chip size="lg" variant="outline">
        Large
      </Chip>
      <Chip size="icon" variant="outline">
        <HugeiconsIcon icon={PlusSignIcon} />
      </Chip>
    </div>
  ),
};
