import { render, screen } from "@testing-library/react";
import ReviewCard from "@/components/reviews/ReviewCard";

const mockReview = {
  comment: "Great product",
  rating: 4,
  name: "John Le",
  image: "/path/to/image.jpg",
};

describe("ReviewCard", () => {
  it("renders the review info correctly", () => {
    render(<ReviewCard reviewInfo={mockReview} />);

    const img = screen.getByAltText(mockReview.name) as HTMLImageElement;
    const stars = screen.getAllByTestId("FaStar");

    expect(screen.getByText(mockReview.name)).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("image.jpg");
    expect(stars).toHaveLength(4);
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });

  it("renders the children in the correct position", () => {
    const { container } = render(
      <ReviewCard reviewInfo={mockReview}>
        <div data-testid='child'>Child Content</div>
      </ReviewCard>
    );

    const child = screen.getByTestId("child");
    const cardDiv = container.querySelector(".relative");

    expect(child).toBeInTheDocument();
    expect(cardDiv).toContainElement(child);
  });
});
