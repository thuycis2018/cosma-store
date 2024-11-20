import { render, screen } from "@testing-library/react";
import FormInput from "@/components/form/FormInput";

describe("FormInput component", () => {
  it("renders with the correct label", () => {
    render(<FormInput name='username' type='text' label='User Name' />);

    expect(screen.getByLabelText("User Name")).toBeInTheDocument();
  });

  it("renders with default value", () => {
    render(
      <FormInput
        name='email'
        type='email'
        label='Email Address'
        defaultValue='test@example.com'
      />
    );

    const inputElement = screen.getByLabelText(
      "Email Address"
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("test@example.com");
  });

  it("displays the correct placeholder", () => {
    render(
      <FormInput
        name='password'
        type='password'
        label='Password'
        placeholder='Enter your password'
      />
    );

    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });

  it("uses the name as the label if no label is provided", () => {
    render(<FormInput name='phone' type='tel' />);

    expect(screen.getByLabelText("phone")).toBeInTheDocument();
  });
});
