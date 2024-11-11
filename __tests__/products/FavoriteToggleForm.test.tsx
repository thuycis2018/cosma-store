import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FavoriteToggleForm from "@/components/products/FavoriteToggleForm";
import { toggleFavoriteAction } from "@/utils/actions";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/utils/actions", () => ({
  toggleFavoriteAction: jest.fn(),
}));

jest.mock("@/components/form/FormContainer", () => {
  return {
    __esModule: true,
    default: ({
      action,
      children,
    }: {
      action: () => void;
      children: React.ReactNode;
    }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          action();
        }}
        data-testid='mock-form'
      >
        {children}
      </form>
    ),
  };
});

jest.mock("@/components/form/Buttons", () => ({
  CardSubmitButton: ({ isFavorite }: { isFavorite: boolean }) => (
    <button data-testid='mock-button'>
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  ),
}));

describe("FavoriteToggleForm Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/products/1");
  });

  it("renders the form and button correctly", () => {
    render(<FavoriteToggleForm productId='123' favoriteId={null} />);

    expect(screen.getByTestId("mock-form")).toBeInTheDocument();
    expect(screen.getByTestId("mock-button")).toHaveTextContent("Favorite");
  });

  it("renders the button with 'Unfavorite' when favoriteId is provided", () => {
    render(<FavoriteToggleForm productId='123' favoriteId='fav-123' />);

    expect(screen.getByTestId("mock-button")).toHaveTextContent("Unfavorite");
  });

  it("calls the toggleFavoriteAction when the form is submitted", async () => {
    render(<FavoriteToggleForm productId='123' favoriteId='fav-123' />);

    fireEvent.submit(screen.getByTestId("mock-form"));

    await waitFor(() => {
      expect(toggleFavoriteAction).toHaveBeenCalledWith({
        productId: "123",
        favoriteId: "fav-123",
        pathname: "/products/1",
      });
    });
  });
});
