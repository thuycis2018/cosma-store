import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "@/components/home/Hero";

jest.mock("@/components/home/HeroCarousel", () => () => (
  <div data-testid='hero-carousel'>Mocked HeroCarousel</div>
));

describe("Hero Component", () => {
  it("renders the main heading with the correct text", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", {
      name: /FPGA Design Services/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the paragraph with the correct text", () => {
    render(<Hero />);
    const paragraph = screen.getByText(
      /Top-tier FPGA expertise for AI, finance, and tech/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("renders the button with the correct link", () => {
    render(<Hero />);
    const button = screen.getByRole("link", {
      name: /Our Offers/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/products");
  });

  it("renders the HeroCarousel component", () => {
    render(<Hero />);
    const heroCarousel = screen.getByTestId("hero-carousel");
    expect(heroCarousel).toBeInTheDocument();
  });
});