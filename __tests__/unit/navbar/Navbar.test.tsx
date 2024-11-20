import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/navbar/Navbar";

jest.mock("@/components/navbar/Logo", () => () => <div>Logo</div>);
jest.mock("@/components/navbar/ThemeToggle", () => () => (
  <button>ThemeToggle</button>
));
jest.mock("@/components/navbar/CartButton", () => () => <button>Cart</button>);
jest.mock("@/components/navbar/LinksDropdown", () => () => (
  <button>Links</button>
));

describe("Navbar", () => {
  it("renders the Navbar and all child components", () => {
    render(<Navbar />);

    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("ThemeToggle")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Links")).toBeInTheDocument();
  });

  it("checks if Cart button works", () => {
    render(<Navbar />);

    const cartButton = screen.getByText("Cart");
    expect(cartButton).toBeInTheDocument();
    fireEvent.click(cartButton);
  });

  it("checks if Links button works", () => {
    render(<Navbar />);

    const linksButton = screen.getByText("Links");
    expect(linksButton).toBeInTheDocument();
    fireEvent.click(linksButton);
  });

  it("checks the nav", () => {
    render(<Navbar />);

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });
});
