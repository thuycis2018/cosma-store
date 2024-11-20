import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartTotalRow from "@/components/cart/CartTotalRow";

jest.mock("@/utils/format", () => ({
  formatCurrency: jest.fn((amount) => `$${amount.toFixed(2)}`),
}));

describe("CartTotalRow Component", () => {
  it("renders the label and formatted amount", () => {
    render(<CartTotalRow label='Subtotal' amount={100} />);

    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("renders the Separator component when lastRow is false or undefined", () => {
    render(<CartTotalRow label='Subtotal' amount={100} />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("does not render the Separator component when lastRow is true", () => {
    render(<CartTotalRow label='Order Total' amount={200} lastRow />);

    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
});
