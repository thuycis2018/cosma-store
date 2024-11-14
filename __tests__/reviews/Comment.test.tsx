import { render, screen, fireEvent } from "@testing-library/react";
import Comment from "@/components/reviews/Comment";

describe("Comment component", () => {
  const shortComment = "This is a short comment.";
  const longComment =
    "This is a long comment that exceeds 130 characters. ".repeat(3);

  it("renders a short comment without a 'Show More' button", () => {
    render(<Comment comment={shortComment} />);

    expect(screen.getByText(shortComment)).toBeInTheDocument();
    expect(screen.queryByText(/Show More/i)).not.toBeInTheDocument();
  });

  it("renders a long comment with a 'Show More' button", () => {
    render(<Comment comment={longComment} />);

    expect(
      screen.getByText(longComment.slice(0, 130) + "...")
    ).toBeInTheDocument();
    expect(screen.getByText(/Show More/i)).toBeInTheDocument();
  });
});
