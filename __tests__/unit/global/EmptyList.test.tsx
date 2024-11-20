import { render, screen } from "@testing-library/react";
import EmptyList from "@/components/global/EmptyList";

describe("EmptyList", () => {
  it("renders the default heading", () => {
    render(<EmptyList />);
    const headingElement = screen.getByText("No items found.");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("text-xl");
  });

  it("renders a custom heading", () => {
    const customHeading = "No results available";
    render(<EmptyList heading={customHeading} />);
    const headingElement = screen.getByText(customHeading);
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("text-xl");
  });

  it("applies custom className", () => {
    const customClass = "text-red-500";
    render(<EmptyList className={customClass} />);
    const headingElement = screen.getByText("No items found.");
    expect(headingElement).toHaveClass("text-xl");
    expect(headingElement).toHaveClass(customClass);
  });
});
