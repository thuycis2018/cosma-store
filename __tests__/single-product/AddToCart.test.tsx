import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCart from "@/components/single-product/AddToCart";
import { useAuth } from "@clerk/nextjs";

jest.mock("@clerk/nextjs", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/utils/actions", () => ({
  addToCartAction: jest.fn(),
}));

jest.mock("@/components/single-product/SelectProductQuantity", () => ({
  __esModule: true,
  Mode: {
    SingleProduct: "SingleProduct",
  },
  default: ({ quantity, setQuantity, mode }: any) => (
    <div data-testid='select-product-quantity'>
      <button onClick={() => setQuantity(quantity + 1)}>
        Increase Quantity
      </button>
      <p>Mode: {mode}</p>
      <p>Quantity: {quantity}</p>
    </div>
  ),
}));

jest.mock("@/components/form/FormContainer", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <form data-testid='form-container'>{children}</form>
  ),
}));

jest.mock("@/components/form/Buttons", () => ({
  SubmitButton: ({ text }: { text: string }) => (
    <button type='submit'>{text}</button>
  ),
  ProductSignInButton: () => <button>Sign In to Add to Cart</button>,
}));

describe("AddToCart Component", () => {
  const productId = "test-product-id";

  it("renders correctly when the user is useAuthenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ userId: "123" });

    render(<AddToCart productId={productId} />);

    expect(screen.getByTestId("form-container")).toBeInTheDocument();
    expect(screen.getByText("add to cart")).toBeInTheDocument();
  });

  it("renders the ProductSignInButton when the user is not useAuthenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ userId: null });

    render(<AddToCart productId={productId} />);

    expect(screen.getByText("Sign In to Add to Cart")).toBeInTheDocument();
    expect(screen.queryByTestId("form-container")).not.toBeInTheDocument();
  });

  it("updates quantity correctly", () => {
    (useAuth as jest.Mock).mockReturnValue({ userId: "123" });

    render(<AddToCart productId={productId} />);

    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Increase Quantity"));

    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
  });
});
