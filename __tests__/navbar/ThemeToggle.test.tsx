import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({ onClick, children, ...props }: any) => (
    <div onClick={onClick} {...props}>
      {children}
    </div>
  ),
}));

describe("ThemeToggle Component", () => {
  const setThemeMock = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ setTheme: setThemeMock });
    jest.clearAllMocks();
  });

  it("renders the mode toggle button with icons", () => {
    render(<ThemeToggle />);

    expect(screen.getByTestId("Light-icon")).toBeInTheDocument();
    expect(screen.getByTestId("Dark-icon")).toBeInTheDocument();
  });

  it('sets theme to light when the "Light" menu item is clicked', () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByTestId("Light"));

    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it('sets theme to dark when the "Dark" menu item is clicked', () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByTestId("Dark"));

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});
