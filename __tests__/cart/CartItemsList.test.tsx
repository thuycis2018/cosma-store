import { render, screen } from "@testing-library/react";
import CartItemsList from "@/components/cart/CartItemsList";
import { CartItemWithProduct } from "@/utils/types";

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-card'>{children}</div>
  ),
}));

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid='link'>
      {children}
    </a>
  );
});

jest.mock("@clerk/nextjs", () => ({
  SignInButton: () => (
    <div data-testid='mock-sign-in-button'>Mock SignInButton</div>
  ),
}));

const mockCartItems: CartItemWithProduct[] = [
  {
    id: "cart-item-1",
    quantity: 2,
    product: {
      id: "product-1",
      name: "Sample Product",
      company: "Sample Company",
      description: "A sample product description",
      featured: false,
      image: "/sample-product.jpg",
      price: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
      clerkId: "clerk-123",
    },
    productId: "product-1",
    cartId: "cart-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("CartItemsList Component", () => {
  it("renders the cart items correctly", () => {
    render(<CartItemsList cartItems={mockCartItems} />);
    //render(await CartItemsList({ cartItems:mockCartItems }));
    expect(screen.getByText("Sample Product")).toBeInTheDocument();

    const imageElement = screen.getByAltText("Sample Product");
    //expect(imageElement).toHaveAttribute("src", "/sample-product.jpg");
    expect(imageElement.getAttribute("src")).toContain("sample-product.jpg");

    expect(screen.getByText("$500.00")).toBeInTheDocument();
  });

  // it("renders correctly with mock SignInButton", () => {
  //   render(<CartItemsList cartItems={[]} />);
  //   expect(screen.getByTestId("mock-sign-in-button")).toBeInTheDocument();
  // });
});
