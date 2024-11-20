import { render, screen, fireEvent } from "@testing-library/react";
import SelectProductQuantity, {
  Mode,
} from "@/components/single-product/SelectProductQuantity";

describe("SelectProductQuantity Component", () => {
  it("renders the select component with the correct initial quantity", () => {
    render(
      <SelectProductQuantity
        mode={Mode.SingleProduct}
        quantity={5}
        setQuantity={jest.fn()}
      />
    );

    // Check that the SelectTrigger displays the correct initial value
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("displays the correct number of select items for SingleProduct mode", () => {
    render(
      <SelectProductQuantity
        mode={Mode.SingleProduct}
        quantity={1}
        setQuantity={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("combobox"));

    // Check that there are 10 options rendered
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(10);
  });

  it("displays additional items when in CartItem mode", () => {
    render(
      <SelectProductQuantity
        mode={Mode.CartItem}
        quantity={5}
        setQuantity={jest.fn()}
        isLoading={false}
      />
    );
    fireEvent.click(screen.getByRole("combobox"));

    // Check that there are more than 10 options due to quantity + 10 logic
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(15); // 5 initial quantity + 10 additional options
  });

  it("disables the select when in CartItem mode and isLoading is true", () => {
    render(
      <SelectProductQuantity
        mode={Mode.CartItem}
        quantity={5}
        setQuantity={jest.fn()}
        isLoading={true}
      />
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("calls setQuantity with the correct value when an item is selected", () => {
    const mockSetQuantity = jest.fn();
    render(
      <SelectProductQuantity
        mode={Mode.SingleProduct}
        quantity={1}
        setQuantity={mockSetQuantity}
      />
    );

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("3"));

    expect(mockSetQuantity).toHaveBeenCalledWith(3);
  });
});
