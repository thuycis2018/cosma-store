import { render, screen, waitFor } from "@testing-library/react";
import ProductReviews from "@/components/reviews/ProductReviews";
import { fetchProductReviews } from "@/utils/actions";

// Mock the fetchProductReviews function
jest.mock("@/utils/actions", () => ({
  fetchProductReviews: jest.fn(),
}));

describe("ProductReviews", () => {
  const mockProductId = "12345";
  const mockReviews = [
    {
      id: "1",
      comment: "Great product!",
      rating: 5,
      authorImageUrl: "/images/author1.jpg",
      authorName: "John Doe",
    },
    {
      id: "2",
      comment: "Not bad, could be better.",
      rating: 3,
      authorImageUrl: "/images/author2.jpg",
      authorName: "Jane Doe",
    },
  ];

  beforeEach(() => {
    (fetchProductReviews as jest.Mock).mockResolvedValue(mockReviews);
  });

  it("fetches and displays reviews", async () => {
    render(await ProductReviews({ productId: mockProductId }));

    await waitFor(() => screen.getByText("reviews"));

    expect(screen.getByText("reviews")).toBeInTheDocument();
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
      expect(screen.getByText(review.authorName)).toBeInTheDocument();
    });
  });
});
