import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import FormContainer from "@/components/form/FormContainer";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";

jest.mock("@/components/ui/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: jest.fn(),
}));

describe("FormContainer Component", () => {
  const mockToast = jest.fn();
  const mockAction = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useFormState as jest.Mock).mockReturnValue([{ message: "" }, mockAction]);
  });

  it("renders children correctly", () => {
    const children = <button type='submit'>Submit</button>;
    const mockUseFormState = require("react-dom").useFormState;
    mockUseFormState.mockReturnValue([{}, mockAction]);

    render(<FormContainer action={mockAction}>{children}</FormContainer>);

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("triggers toast on message change", async () => {
    // Set up the mock to return a state with a message
    (useFormState as jest.Mock).mockReturnValueOnce([
      { message: "Test message" },
      mockAction,
    ]);

    render(
      <FormContainer action={mockAction}>
        <button type='submit'>Submit</button>
      </FormContainer>
    );

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({ description: "Test message" });
    });
  });
});
