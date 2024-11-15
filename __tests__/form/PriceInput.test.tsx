import { render, screen } from "@testing-library/react";
import PriceInput from "@/components/form/PriceInput";

describe("PriceInput component", () => {
  it("renders the label with correct text", () => {
    render(<PriceInput />);

    const labelElement = screen.getByLabelText("Price ($)");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders an input element with the correct attributes", () => {
    render(<PriceInput defaultValue={150} />);

    const inputElement = screen.getByRole("spinbutton", { name: /price/i });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "number");
    expect(inputElement).toHaveAttribute("min", "0");
    expect(inputElement).toHaveValue(150);
  });

  it("renders the input with a default value of 100 if no defaultValue is provided", () => {
    render(<PriceInput />);

    const inputElement = screen.getByRole("spinbutton", { name: /price/i });
    expect(inputElement).toHaveValue(100);
  });
});
