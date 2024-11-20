import { render, screen, waitFor } from "@testing-library/react";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import { auth } from "@clerk/nextjs/server";
import { fetchFavoriteId } from "@/utils/actions";

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

jest.mock("@/utils/actions", () => ({
  fetchFavoriteId: jest.fn(),
}));

jest.mock("@/components/form/Buttons", () => ({
  CardSignInButton: () => <button data-testid='sign-in-button'>Sign In</button>,
}));

jest.mock("@/components/products/FavoriteToggleForm", () => ({
  __esModule: true,
  default: ({
    favoriteId,
    productId,
  }: {
    favoriteId: string | null;
    productId: string;
  }) => (
    <div data-testid='favorite-toggle-form'>
      FavoriteToggleForm rendered with favoriteId: {favoriteId} and productId:{" "}
      {productId}
    </div>
  ),
}));

describe("FavoriteToggleButton Component", () => {
  const productId = "123";

  it("renders CardSignInButton when there is no userId", async () => {
    (auth as jest.Mock).mockReturnValue({ userId: null });

    render(await FavoriteToggleButton({ productId }));

    expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();
  });

  it("renders FavoriteToggleForm when userId is present", async () => {
    (auth as jest.Mock).mockReturnValue({ userId: "user-456" });
    (fetchFavoriteId as jest.Mock).mockResolvedValue("fav-789");

    render(await FavoriteToggleButton({ productId }));

    await waitFor(() => {
      expect(screen.getByTestId("favorite-toggle-form")).toBeInTheDocument();
      expect(screen.getByText(/fav-789/)).toBeInTheDocument();
      expect(screen.getByText(/123/)).toBeInTheDocument();
    });
  });
});
