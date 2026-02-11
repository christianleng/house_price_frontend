import { EnergyPerformanceIcon } from "@/features/properties/components/energy-performance/EnergyPerformanceIcon";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Domain/EnergyPerformance",
  component: EnergyPerformanceIcon,
  tags: ["autodocs"],
  args: {
    value: "A",
  },
  argTypes: {
    value: {
      control: "select",
      options: ["A", "B", "C", "D", "E", "F", "G"],
    },
  },
} satisfies Meta<typeof EnergyPerformanceIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllRatings: Story = {
  args: {
    value: "A",
  },
  render: () => (
    <div className="flex flex-col gap-3">
      {(["A", "B", "C", "D", "E", "F", "G"] as const).map((rating) => (
        <div key={rating} className="flex items-center gap-4">
          <EnergyPerformanceIcon value={rating} />
          <span className="text-sm text-slate-500 font-medium">
            Classe énergétique {rating}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const SingleRating: Story = {
  args: {
    value: "B",
  },
};

export const GRating: Story = {
  args: {
    value: "G",
  },
};
