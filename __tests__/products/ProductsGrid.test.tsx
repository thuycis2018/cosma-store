import { render, screen } from "@testing-library/react";
import ProductsGrid from "@/components/products/ProductsGrid";
import { Product } from "@prisma/client";

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-card'>{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-card-content'>{children}</div>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-link'>{children}</div>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, fill, ...props }: any) => (
    <img data-testid='mock-image' {...props} />
  ),
}));

jest.mock("@/components/products/FavoriteToggleButton", () => ({
  __esModule: true,
  default: ({ productId }: { productId: string }) => (
    <div data-testid='mock-favorite-button'>Favorite {productId}</div>
  ),
}));

describe("ProductsPrid Component", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Product 1",
      price: 1000,
      image: "/path/to/image1.jpg",
      company: "Company A",
      description: "",
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      clerkId: "",
    },
    {
      id: "2",
      name: "Product 2",
      price: 1500,
      image: "/path/to/image2.jpg",
      company: "Company B",
      description: "",
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      clerkId: "",
    },
  ];

  it("renders the products grid correctly", () => {
    render(<ProductsGrid products={mockProducts} />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    // Check for the mock components
    expect(screen.getAllByTestId("mock-card")).toHaveLength(
      mockProducts.length
    );
    expect(screen.getAllByTestId("mock-image")).toHaveLength(
      mockProducts.length
    );
  });

  it("renders the FavoriteToggleButton component for each product", () => {
    render(<ProductsGrid products={mockProducts} />);
    mockProducts.forEach((product) => {
      expect(screen.getByText(`Favorite ${product.id}`)).toBeInTheDocument();
    });
  });
});
