import { render, screen } from "@testing-library/react";
import Logo from "@/components/navbar/Logo";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, width, height }: any) => (
    <img alt={alt} src={src} width={width} height={height} />
  ),
}));

describe("Logo", () => {
  it("renders the button and link", () => {
    render(<Logo />);
    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the logo image with correct attributes", () => {
    render(<Logo />);
    const img = screen.getByAltText("Cosma logo");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("width", "24");
    expect(img).toHaveAttribute("height", "24");
  });
});
