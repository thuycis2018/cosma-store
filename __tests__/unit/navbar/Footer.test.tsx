import { render, screen } from "@testing-library/react";
import Footer from "@/components/navbar/Footer";

describe("Footer", () => {
  it("displays the correct copyright and company name", () => {
    render(<Footer />);

    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  it("displays the correct current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const yearElement = screen.getByText(currentYear.toString());

    expect(yearElement).toBeInTheDocument();
  });
});
