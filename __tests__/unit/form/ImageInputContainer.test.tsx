import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageInputContainer from "@/components/form/ImageInputContainer";

jest.mock("next/image", () => (props: any) => (
  <img {...props} alt={props.alt} />
));
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));
jest.mock("@/components/form/FormContainer", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <form data-testid='form-container'>{children}</form>
  ),
}));
jest.mock("@/components/form/ImageInput", () => () => (
  <input type='file' data-testid='image-input' />
));
jest.mock("@/components/form/Buttons", () => ({
  SubmitButton: ({ ...props }: any) => <button {...props}>Submit</button>,
}));

describe("ImageInputContainer Component", () => {
  const mockAction = jest.fn();

  it("renders the image, button, and handles button click to show form", () => {
    render(
      <ImageInputContainer
        image='/test-image.jpg'
        name='Test Image'
        action={mockAction}
        text='Edit Image'
      />
    );

    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");

    const button = screen.getByText("Edit Image");
    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId("form-container")).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByTestId("form-container")).toBeInTheDocument();
    expect(screen.getByTestId("image-input")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("hides the form when the button is clicked again", () => {
    render(
      <ImageInputContainer
        image='/test-image.jpg'
        name='Test Image'
        action={mockAction}
        text='Edit Image'
      />
    );

    const button = screen.getByText("Edit Image");
    fireEvent.click(button);

    expect(screen.getByTestId("form-container")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByTestId("form-container")).not.toBeInTheDocument();
  });
});
