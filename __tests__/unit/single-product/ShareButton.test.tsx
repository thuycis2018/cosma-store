import { render, screen, fireEvent } from "@testing-library/react";
import ShareButton from "@/components/single-product/ShareButton";

jest.mock("react-share", () => ({
  TwitterShareButton: jest.fn(({ children }) => <div>{children}</div>),
  LinkedinShareButton: jest.fn(({ children }) => <div>{children}</div>),
  EmailShareButton: jest.fn(({ children }) => <div>{children}</div>),
  TwitterIcon: jest.fn(() => <div>TwitterIcon</div>),
  LinkedinIcon: jest.fn(() => <div>LinkedinIcon</div>),
  EmailIcon: jest.fn(() => <div>EmailIcon</div>),
}));

describe("ShareButton", () => {
  const productId = "123";
  const productName = "Test Product";

  it("renders the share button", () => {
    render(<ShareButton productId={productId} name={productName} />);

    // Check that the Share button is rendered
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows social media share buttons when clicked", () => {
    render(<ShareButton productId={productId} name={productName} />);

    // Click on the share button
    fireEvent.click(screen.getByRole("button"));

    // Check that the share buttons are displayed
    expect(screen.getByText("TwitterIcon")).toBeInTheDocument();
    expect(screen.getByText("LinkedinIcon")).toBeInTheDocument();
    expect(screen.getByText("EmailIcon")).toBeInTheDocument();
  });
});
