import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CartButton from "@/components/navbar/CartButton";
import { fetchCartItems } from "@/utils/actions";

jest.mock("@/utils/actions", () => ({
  fetchCartItems: jest.fn(),
}));

describe("CartButton", () => {
  it("should render the CartButton with the cart icon", async () => {
    (fetchCartItems as jest.Mock).mockResolvedValue(3);
    render(await CartButton());

    await waitFor(() => screen.getByText("3"));

    // Check if the cart icon and item count are rendered correctly
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByTestId("LuShoppingCart")).toBeInTheDocument();
  });

  it("should display '0' if no items are in the cart", async () => {
    (fetchCartItems as jest.Mock).mockResolvedValue(0);
    render(await CartButton());

    await waitFor(() => screen.getByText("0"));

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should redirect to the cart page when clicked", async () => {
    (fetchCartItems as jest.Mock).mockResolvedValue(2);
    render(await CartButton());

    await waitFor(() => screen.getByText("2"));
    const cartLink = screen.getByRole("link");
    fireEvent.click(cartLink);

    expect(cartLink).toHaveAttribute("href", "/cart");
  });
});
