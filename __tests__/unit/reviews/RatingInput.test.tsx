import { render, screen, fireEvent } from "@testing-library/react";
import RatingInput from "@/components/reviews/RatingInput"; // Adjust the import path as needed

describe("RatingInput", () => {
  it("renders with a label and the correct default value", () => {
    const { container } = render(<RatingInput name='rating' />);

    const selectTrigger = screen.getByRole("combobox");

    expect(screen.getByText("rating")).toBeInTheDocument();
    expect(selectTrigger).toBeInTheDocument();
    // Check the default value
    expect(selectTrigger.textContent).toBe("5");
  });

  it("renders custom label text", () => {
    render(<RatingInput name='rating' labelText='Select Rating' />);

    expect(screen.getByText("Select Rating")).toBeInTheDocument();
  });

  it("displays the correct options in the select dropdown", () => {
    render(<RatingInput name='rating' />);

    fireEvent.click(screen.getByRole("combobox"));
    const options = screen.getAllByRole("option");
    const optionValues = options.map((option) => option.textContent);

    expect(options).toHaveLength(5);
    expect(optionValues).toEqual(["5", "4", "3", "2", "1"]);
  });

  it("updates the selected value when an option is clicked", () => {
    render(<RatingInput name='rating' />);

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("3"));

    const selectElement = screen.getByRole("combobox");
    expect(selectElement.textContent).toBe("3");
  });
});
