import { render, screen } from "@testing-library/react";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { fetchFeaturedProducts } from "@/utils/actions";

jest.mock("@/utils/actions", () => ({
  fetchFeaturedProducts: jest.fn(),
}));

jest.mock("@/components/products/ProductsGrid", () => () => (
  <div data-testid='mock-products-grid'>Mock ProductsGrid</div>
));

describe("FeaturedProducts Component", () => {
  beforeEach(() => {
    (fetchFeaturedProducts as jest.Mock).mockResolvedValue([
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ]);
  });

  it("renders the EmptyList component when there are no products", async () => {
    (fetchFeaturedProducts as jest.Mock).mockResolvedValue([]);

    render(await FeaturedProducts()); // Render the server-side component as a promise.

    const emptyListElement = screen.getByText(/no items found/i);
    expect(emptyListElement).toBeInTheDocument();
  });

  it("renders SectionTitle and ProductsGrid when products are available", async () => {
    render(await FeaturedProducts());

    const sectionTitle = await screen.findByText(/featured offers/i);
    expect(sectionTitle).toBeInTheDocument();

    const productGridElement = await screen.findByTestId("mock-products-grid");
    expect(productGridElement).toBeInTheDocument();
  });
});
