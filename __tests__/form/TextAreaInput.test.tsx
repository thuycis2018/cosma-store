import { render, screen } from "@testing-library/react";
import TextAreaInput from "@/components/form/TextAreaInput";

describe("TextAreaInput component", () => {
  it("renders the label with the correct text", () => {
    render(<TextAreaInput name='description' labelText='Description' />);

    const labelElement = screen.getByLabelText("Description");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders a textarea element with the correct attributes", () => {
    render(<TextAreaInput name='comments' defaultValue='Initial text' />);

    const textareaElement = screen.getByRole("textbox", { name: /comments/i });
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).toHaveAttribute("rows", "5");
    expect(textareaElement).toHaveValue("Initial text");
  });

  it("renders the textarea with an empty value if no defaultValue is provided", () => {
    render(<TextAreaInput name='feedback' />);

    const textareaElement = screen.getByRole("textbox", { name: /feedback/i });
    expect(textareaElement).toHaveValue("");
  });
});
