import { render, screen, waitFor } from "@testing-library/react";
import ProductRating from "@/components/single-product/ProductRating";
import { fetchProductRating } from "@/utils/actions";

jest.mock("@/utils/actions", () => ({
  fetchProductRating: jest.fn(),
}));

describe("ProductRating Component", () => {
  it("renders the product rating and count correctly", async () => {
    (fetchProductRating as jest.Mock).mockResolvedValue({
      rating: 4.5,
      count: 120,
    });

    render(await ProductRating({ productId: "12345" }));

    await waitFor(() => {
      expect(screen.getByText(/4.5/i)).toBeInTheDocument();
      expect(screen.getByText(/\(120\) reviews/i)).toBeInTheDocument();
    });
  });
});
