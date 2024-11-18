import { render, screen } from "@testing-library/react";
import {
  FirstColumn,
  SecondColumn,
  FourthColumn,
} from "@/components/cart/CartItemColumns";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid='link'>
      {children}
    </a>
  );
});

describe("FirstColumn Component", () => {
  it("renders the image with correct alt text and checks src includes original path", () => {
    render(<FirstColumn name='Product Name' image='/test-image.jpg' />);
    const image = screen.getByAltText("Product Name");

    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain("test-image.jpg");
  });
});

describe("SecondColumn Component", () => {
  it("renders the link with product name", () => {
    render(<SecondColumn name='Product Name' slug='123' />);
    const link = screen.getByTestId("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/products/123");
    expect(screen.getByText(/product name/i)).toBeInTheDocument();
  });
});

describe("FourthColumn Component", () => {
  it("displays formatted price", () => {
    render(<FourthColumn price={99.99} />);
    expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
  });
});
