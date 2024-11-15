import { render, screen } from "@testing-library/react";
import ImageInput from "@/components/form/ImageInput";

describe("ImageInput component", () => {
  it("renders the label with the correct text", () => {
    render(<ImageInput />);

    expect(screen.getByLabelText("Image")).toBeInTheDocument();
  });

  it("renders an input element of type file", () => {
    render(<ImageInput />);

    const inputElement = screen.getByLabelText("Image") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe("file");
  });

  it("has the required and accept attributes", () => {
    render(<ImageInput />);

    const inputElement = screen.getByLabelText("Image") as HTMLInputElement;
    expect(inputElement.required).toBe(true);
    expect(inputElement.accept).toBe("image/*");
  });
});
