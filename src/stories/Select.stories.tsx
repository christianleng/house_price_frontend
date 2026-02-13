import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/core/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/core/lib/utils";

interface SelectStoryProps extends React.ComponentProps<typeof Select> {
  placeholder?: string;
  className?: string;
  size?: "default" | "sm";
}

const SelectDemo = ({
  className,
  size = "default",
  ...args
}: SelectStoryProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <Select
      value={value ?? "Options"}
      onValueChange={(val) => setValue(val as string)}
      {...args}
    >
      <SelectTrigger className={cn("w-70", className)} size={size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apartment">Appartement</SelectItem>
          <SelectItem value="house">Maison</SelectItem>
          <SelectItem value="land">Terrain</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  render: (args) => <SelectDemo {...args} />,
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "sm"],
      description: "Taille du déclencheur",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    placeholder: {
      control: "text",
      description: "Texte affiché quand la value est undefined",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<SelectStoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "default",
    placeholder: "Choisir une option",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Petit select",
  },
};

export const HeaderGhost: Story = {
  decorators: [
    (Story) => (
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 px-2 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <HugeiconsIcon
              icon={Home01Icon}
              className="size-3.5 text-brand-500"
            />
            Type de bien
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    className:
      "h-auto w-full border-none bg-transparent p-0 shadow-none hover:bg-transparent focus:ring-0 px-2",
    placeholder: "Appartement ou maison",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Le placeholder s'affiche car la valeur est initialement `undefined`.",
      },
    },
  },
};
