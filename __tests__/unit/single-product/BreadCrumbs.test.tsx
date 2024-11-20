import { render, screen } from "@testing-library/react";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";

describe("BreadCrumbs Component", () => {
  it("renders the breadcrumb links correctly", () => {
    const productName = "Sample Product";
    render(<BreadCrumbs name={productName} />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toHaveAttribute("href", "/");
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toHaveAttribute("href", "/products");
    expect(screen.getByText(productName)).toBeInTheDocument();
  });

  it("renders the breadcrumb separators", () => {
    const { container } = render(<BreadCrumbs name='Test Product' />);
    const svgElements = container.querySelectorAll("svg");

    expect(svgElements.length).toBeGreaterThan(0);
  });
});
