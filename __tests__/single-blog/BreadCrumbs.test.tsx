import { render, screen } from "@testing-library/react";
import BreadCrumbs from "@/components/single-blog/BreadCrumbs";

describe("BreadCrumbs Component", () => {
  it("renders the breadcrumb links correctly", () => {
    const blogName = "Sample Blog";
    render(<BreadCrumbs name={blogName} />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toHaveAttribute("href", "/");
    expect(screen.getByText(/blogs/i)).toBeInTheDocument();
    expect(screen.getByText(/blogs/i)).toHaveAttribute("href", "/blogs");
    expect(screen.getByText(blogName)).toBeInTheDocument();
  });

  it("renders the breadcrumb separators", () => {
    const { container } = render(<BreadCrumbs name='Test Blog' />);
    const svgElements = container.querySelectorAll("svg");

    expect(svgElements.length).toBeGreaterThan(0);
  });
});
