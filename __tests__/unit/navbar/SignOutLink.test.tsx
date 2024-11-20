import { render, screen, fireEvent } from "@testing-library/react";
import SignOutLink from "@/components/navbar/SignOutLink";
import { useToast } from "@/components/ui/use-toast";

jest.mock("@/components/ui/use-toast", () => ({
  useToast: jest.fn(),
}));

jest.mock("@clerk/nextjs", () => ({
  SignOutButton: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("SignOutLink", () => {
  it("renders the logout link", () => {
    (useToast as jest.Mock).mockReturnValue({ toast: jest.fn() });
    render(<SignOutLink />);
    const logoutLink = screen.getByText("Logout");

    expect(logoutLink).toBeInTheDocument();
  });

  it("calls toast with 'Logging Out...' when the link is clicked", () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    render(<SignOutLink />);
    const logoutLink = screen.getByText("Logout");
    fireEvent.click(logoutLink);

    expect(mockToast).toHaveBeenCalledWith({ description: "Logging Out..." });
  });

  it("wraps the Link inside the SignOutButton component", () => {
    render(<SignOutLink />);
    const signOutWrapper = screen.getByText("Logout").closest("div");

    expect(signOutWrapper).toBeInTheDocument();
  });
});
