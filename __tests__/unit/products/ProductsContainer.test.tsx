import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsContainer from "@/components/products/ProductsContainer";
import { fetchAllProducts } from "@/utils/actions";

jest.mock("@/utils/actions", () => ({
  fetchAllProducts: jest.fn(),
}));

jest.mock("@/components/products/ProductsGrid", () => () => (
  <div data-testid='mock-products-grid'>Mock ProductsGrid</div>
));

jest.mock("@/components/products/ProductsList", () => () => (
  <div data-testid='mock-products-list'>Mock ProductsList</div>
));

jest.mock("next/link", () => {
  return ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe("ProductsContainer", () => {
  beforeAll(() => {
    Object.defineProperty(window, "history", {
      value: {
        pushState: jest.fn(),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    // Mocking fetchAllProducts to return some mock products for testing
    (fetchAllProducts as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "image1.jpg",
        company: "Company 1",
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        image: "image2.jpg",
        company: "Company 2",
      },
    ]);
  });

  it("renders the correct number of products", async () => {
    render(await ProductsContainer({ layout: "grid", search: "" }));

    // Wait for products to be rendered
    await waitFor(() => screen.getByText("2 items"));

    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("renders ProductsGrid when layout is grid", async () => {
    render(await ProductsContainer({ layout: "grid", search: "" }));

    await waitFor(() => screen.getByTestId("mock-products-grid"));

    expect(screen.getByTestId("mock-products-grid")).toBeInTheDocument();
  });

  it("renders ProductsList when layout is list", async () => {
    render(await ProductsContainer({ layout: "list", search: "" }));

    await waitFor(() => screen.getByTestId("mock-products-list"));

    expect(screen.getByTestId("mock-products-list")).toBeInTheDocument();
  });

  it("renders the empty state when no products are found", async () => {
    (fetchAllProducts as jest.Mock).mockResolvedValue([]);
    render(await ProductsContainer({ layout: "grid", search: "nonexistent" }));

    await waitFor(() =>
      screen.getByText("Sorry, no items matched your search...")
    );

    expect(
      screen.getByText("Sorry, no items matched your search...")
    ).toBeInTheDocument();
  });
});
