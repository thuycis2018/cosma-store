import { render, screen } from "@testing-library/react";
import Rating from "@/components/reviews/Rating";

describe("Rating", () => {
  it("displays the correct number of filled and empty stars for a given rating", () => {
    const rating = 3;
    render(<Rating rating={rating} />);

    const filledStars = screen.getAllByTestId("FaStar");
    const emptyStars = screen.getAllByTestId("FaRegStar");

    expect(filledStars.length).toBe(rating);
    expect(emptyStars.length).toBe(5 - rating);
  });

  it("renders 5 empty stars for a rating of 0", () => {
    render(<Rating rating={0} />);

    const filledStars = screen.queryAllByTestId("FaStar");
    const emptyStars = screen.queryAllByTestId("FaRegStar");

    expect(filledStars.length).toBe(0);
    expect(emptyStars.length).toBe(5);
  });

  it("renders 5 filled stars for a rating of 5", () => {
    render(<Rating rating={5} />);

    const filledStars = screen.queryAllByTestId("FaStar");
    const emptyStars = screen.queryAllByTestId("FaRegStar");

    expect(filledStars.length).toBe(5);
    expect(emptyStars.length).toBe(0);
  });
});
