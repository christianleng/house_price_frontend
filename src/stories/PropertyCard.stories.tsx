import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import type {
  PropertyId,
  PropertyPreview,
  PropertyReference,
  EnergyRating,
  PropertyType,
} from "@/features/properties/types/property.types";
import { PropertyCard } from "@/features/properties/components/property-card/PropertyCard";
import { AuthProvider } from "@/features/auth/providers/authProviders";
import { QueryProvider } from "@/app/providers/QueryProvider";

const baseProperty = {
  id: "1" as PropertyId,
  reference: "REF-123" as PropertyReference,
  title: "Bel appartement lumineux",
  city: "Bordeaux",
  postal_code: "33000",
  property_type: "apartment" as PropertyType,
  surface_area: 75,
  rooms: 4,
  bedrooms: 2,
  latitude: 44.8378,
  longitude: -0.5792,
  created_at: new Date().toISOString(),
  thumbnail_url:
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
  photos_count: 12,
  energy_rating: "B" as EnergyRating,
};

const mockSaleProperty: PropertyPreview = {
  ...baseProperty,
  transaction_type: "sale",
  price: 450000,
  price_per_sqm: 6000,
};

const meta = {
  title: "Domain/PropertyCard",
  component: PropertyCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryProvider>
        <AuthProvider>
          <MemoryRouter>
            <div className="max-w-87.5">
              <Story />
            </div>
          </MemoryRouter>
        </AuthProvider>
      </QueryProvider>
    ),
  ],
  args: {
    property: mockSaleProperty,
    isPriority: true,
  },
} satisfies Meta<typeof PropertyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sale: Story = {
  args: {
    property: mockSaleProperty,
  },
};

export const Rent: Story = {
  args: {
    property: {
      ...baseProperty,
      transaction_type: "rent",
      rent_price_monthly: 1250,
    } as PropertyPreview,
  },
};

export const NoImage: Story = {
  args: {
    property: {
      ...mockSaleProperty,
      thumbnail_url: null,
    },
  },
};
