import MapPriceTag from "@/features/properties/components/map/MapPriceTag";
import type {
  EnergyRating,
  PropertyId,
  PropertyPreview,
} from "@/features/properties/types/property.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const mockBase = {
  id: "1" as PropertyId,
  latitude: 48.8566,
  longitude: 2.3522,
  energy_rating: "B" as EnergyRating,
};

const meta = {
  title: "Domain/Map/Marker",
  component: MapPriceTag,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-10 flex justify-center bg-slate-200">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MapPriceTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallPrice: Story = {
  args: {
    property: {
      ...mockBase,
      transaction_type: "rent",
      rent_price_monthly: 850,
    } as PropertyPreview,
  },
};

export const LargePrice: Story = {
  args: {
    property: {
      ...mockBase,
      transaction_type: "sale",
      price: 1250000,
    } as PropertyPreview,
  },
};

export const Hovered: Story = {
  parameters: {
    pseudo: { hover: true },
  },
  args: {
    property: {
      ...mockBase,
      transaction_type: "sale",
      price: 450000,
    } as PropertyPreview,
  },
};
