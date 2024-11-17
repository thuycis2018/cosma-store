import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LinksDropdown from "@/components/navbar/LinksDropdown";
import { auth } from "@clerk/nextjs/server";

jest.mock("@clerk/nextjs/server", () => ({
  __esModule: true,
  auth: jest.fn(),
}));

jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignedOut: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  SignUpButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  SignOutButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
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
  DropdownMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuSeparator: () => <hr />,
}));

jest.mock("@/components/navbar/UserIcon", () => () => (
  <span data-testid='user-icon'>UserIcon</span>
));

describe("LinksDropdown Component", () => {
  it("renders SignedOut menu items", () => {
    (auth as jest.Mock).mockReturnValue({ userId: null });
    render(<LinksDropdown />);

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("renders SignedIn menu items and hides admin-only link for non-admin users", () => {
    (auth as jest.Mock).mockReturnValue({ userId: "non-admin-user-id" });

    render(<LinksDropdown />);

    expect(screen.queryByText("admin")).not.toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders admin link when user is an admin", () => {
    (auth as jest.Mock).mockReturnValue({ userId: process.env.ADMIN_USER_ID });

    render(<LinksDropdown />);

    expect(screen.getByText("admin")).toBeInTheDocument();
  });
});
