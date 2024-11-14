import { render, screen } from "@testing-library/react";
import Container from "@/components/global/Container";

describe("Container", () => {
  it("renders children correctly", () => {
    render(<Container>Test content</Container>);

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it.only("applies default classes", async () => {
    render(<Container>Test content</Container>);

    const container = screen.getByText("Test content").parentElement;
    const innerDiv = container?.querySelector("div");

    expect(innerDiv).toHaveClass("mx-auto max-w-6xl xl:max-w-7xl px-8");
  });

  it("applies custom classes when passed", () => {
    render(<Container className='custom-class'>Test content</Container>);

    const container = screen.getByText("Test content").parentElement;
    const innerDiv = container?.querySelector("div");
    expect(innerDiv).toHaveClass("custom-class");
  });
});
