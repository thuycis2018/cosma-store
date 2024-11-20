import { render, screen } from "@testing-library/react";
import {
  SubmitButton,
  IconButton,
  CardSignInButton,
  CardSubmitButton,
  ProductSignInButton,
} from "@/components/form/Buttons";
import { useFormStatus } from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

jest.mock("@clerk/nextjs", () => ({
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("SubmitButton", () => {
  it("displays 'Please wait...' when pending is true", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: true });

    render(<SubmitButton />);

    expect(screen.getByText("Please wait...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("displays the default text when pending is false", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });

    render(<SubmitButton text='submit' />);

    expect(screen.getByText("submit")).toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});

describe("IconButton", () => {
  it("renders the edit icon when actionType is 'edit'", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });

    render(<IconButton actionType='edit' />);

    expect(screen.getByTestId("LuPenSquare")).toBeInTheDocument();
  });

  it("renders the delete icon when actionType is 'delete'", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });

    render(<IconButton actionType='delete' />);

    expect(screen.getByTestId("LuTrash2")).toBeInTheDocument();
  });
});

describe("CardSignInButton", () => {
  it("renders correctly", () => {
    render(<CardSignInButton />);
    expect(screen.getByTestId("BsHandThumbsUp")).toBeInTheDocument();
  });
});

describe("CardSubmitButton", () => {
  it("shows filled thumbs-up icon when isFavorite is true", () => {
    render(<CardSubmitButton isFavorite={true} />);

    expect(screen.getByTestId("BsFillHandThumbsUpFill")).toBeInTheDocument();
  });

  it("shows regular thumbs-up icon when isFavorite is false", () => {
    render(<CardSubmitButton isFavorite={false} />);

    expect(screen.getByTestId("BsHandThumbsUp")).toBeInTheDocument();
  });
});

describe("ProductSignInButton", () => {
  it("renders correctly", () => {
    render(<ProductSignInButton />);

    expect(screen.getByText("Please Sign In")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
