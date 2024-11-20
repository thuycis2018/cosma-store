import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxInput from "@/components/form/CheckboxInput";

describe("CheckboxInput component", () => {
  it("renders with the correct label", () => {
    render(<CheckboxInput name='testCheckbox' label='Test Label' />);

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("is checked based on the defaultChecked prop", () => {
    render(
      <CheckboxInput name='testCheckbox' label='Test Label' defaultChecked />
    );

    expect(screen.getByLabelText("Test Label")).toBeChecked();
  });

  it("toggles the checkbox state on click", () => {
    render(<CheckboxInput name='testCheckbox' label='Test Label' />);

    const checkbox = screen.getByLabelText("Test Label");

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
