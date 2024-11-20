import { render, screen } from "@testing-library/react";
import SectionTitle from "@/components/global/SectionTitle";

describe("SectionTitle", () => {
  it("renders the provided text as a title", () => {
    const testText = "Test Title";
    render(<SectionTitle text={testText} />);

    const title = screen.getByText(testText);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(
      "text-3xl",
      "font-medium",
      "tracking-wider",
      "capitalize",
      "mb-8"
    );
  });

  it("renders the Separator component after the title", () => {
    render(<SectionTitle text='Test Title' />);

    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
  });
});
