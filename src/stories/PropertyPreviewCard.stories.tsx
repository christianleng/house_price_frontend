import PropertyPreviewCard from "@/features/properties/components/map/PropertyPreviewCard";
import type {
  PropertyId,
  PropertyPreview,
  PropertyReference,
  PropertyType,
} from "@/features/properties/types/property.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

const mockProperty: PropertyPreview = {
  id: "1" as PropertyId,
  reference: "REF-123" as PropertyReference,
  title: "Appartement de luxe - Vue Tour Eiffel",
  city: "Paris",
  postal_code: "75007",
  property_type: "Appartement" as PropertyType,
  surface_area: 85,
  rooms: 3,
  bedrooms: 2,
  latitude: 48.8584,
  longitude: 2.2945,
  created_at: new Date().toISOString(),
  thumbnail_url:
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
  photos_count: 5,
  energy_rating: "A",
  transaction_type: "sale",
  price: 1890000,
  price_per_sqm: 22235,
};

const meta = {
  title: "Domain/Map/PropertyPreviewCard",
  component: PropertyPreviewCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="max-w-[320px] shadow-xl rounded-2xl overflow-hidden">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: {
    property: mockProperty,
  },
} satisfies Meta<typeof PropertyPreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSale: Story = {};

export const LongTitle: Story = {
  args: {
    property: {
      ...mockProperty,
      title:
        "Magnifique triplex historique avec terrasse privative et jardin suspendu en plein coeur du Marais",
    },
  },
};

export const Rent: Story = {
  args: {
    property: {
      ...mockProperty,
      transaction_type: "rent",
      rent_price_monthly: 4500,
    } as PropertyPreview,
  },
};

export const PlaceholderImage: Story = {
  args: {
    property: {
      ...mockProperty,
      thumbnail_url: null,
    },
  },
};
