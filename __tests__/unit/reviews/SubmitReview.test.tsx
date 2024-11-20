import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SubmitReview from "@/components/reviews/SubmitReview";
import { useUser } from "@clerk/nextjs";

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

jest.mock("@/utils/actions", () => ({
  createReviewAction: jest.fn(),
}));

jest.mock("@/components/form/Buttons", () => ({
  SubmitButton: ({ className }: { className: string }) => (
    <button type='submit' className={className}>
      Submit Review
    </button>
  ),
}));

jest.mock("@/components/form/FormContainer", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <form data-testid='form-container'>{children}</form>
  ),
}));

jest.mock("@/components/reviews/RatingInput", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <input type='number' name={name} data-testid='rating-input' />
  ),
}));

jest.mock("@/components/form/TextAreaInput", () => ({
  __esModule: true,
  default: ({ name, labelText, defaultValue }: any) => (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        data-testid='text-area-input'
      />
    </div>
  ),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("SubmitReview Component", () => {
  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the leave review button", () => {
    (useUser as jest.Mock).mockReturnValue({ user: null });

    render(<SubmitReview productId={productId} />);

    expect(screen.getByText("leave review")).toBeInTheDocument();
  });

  it("displays the review form when the button is clicked", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { firstName: "John", imageUrl: "test-image-url" },
    });

    render(<SubmitReview productId={productId} />);

    fireEvent.click(screen.getByText("leave review"));

    expect(screen.getByTestId("form-container")).toBeInTheDocument();
    expect(screen.getByTestId("rating-input")).toBeInTheDocument();
    expect(screen.getByTestId("text-area-input")).toBeInTheDocument();
  });

  it("passes the correct author information to hidden inputs", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { firstName: "John", imageUrl: "test-image-url" },
    });

    render(<SubmitReview productId={productId} />);
    fireEvent.click(screen.getByText("leave review"));

    const authorNameInput = screen.getByDisplayValue("John");
    const authorImageInput = screen.getByDisplayValue("test-image-url");

    expect(authorNameInput).toHaveAttribute("name", "authorName");
    expect(authorImageInput).toHaveAttribute("name", "authorImageUrl");
  });
});
