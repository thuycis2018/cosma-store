import { render, screen, fireEvent } from "@testing-library/react";
import NavSearch from "@/components/navbar/NavSearch";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { act } from "react";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe("NavSearch Component", () => {
  let replaceMock: jest.Mock;

  beforeEach(() => {
    replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("renders the search input field", () => {
    render(<NavSearch />);
    const inputElement = screen.getByPlaceholderText("search product...");
    expect(inputElement).toBeInTheDocument();
  });

  it("updates the search state on user input", () => {
    render(<NavSearch />);
    const inputElement = screen.getByPlaceholderText("search product...");

    act(() => {
      fireEvent.change(inputElement, { target: { value: "shoes" } });
    });

    expect(inputElement).toHaveValue("shoes");
  });

  it("debounces and updates the URL with the search parameter", () => {
    jest.useFakeTimers();
    render(<NavSearch />);
    const inputElement = screen.getByPlaceholderText("search product...");

    act(() => {
      fireEvent.change(inputElement, { target: { value: "laptop" } });
      jest.advanceTimersByTime(300); // Simulate debounce delay
    });

    expect(replaceMock).toHaveBeenCalledWith("/products?search=laptop");

    jest.useRealTimers();
  });

  //   it("removes the search parameter when input is cleared", () => {
  //     jest.useFakeTimers();
  //     render(<NavSearch />);
  //     const inputElement = screen.getByPlaceholderText("search product...");

  //     act(() => {
  //       fireEvent.change(inputElement, { target: { value: "" } });
  //       jest.advanceTimersByTime(300);
  //     });

  //     expect(replaceMock).toHaveBeenCalledWith("/products");

  //     jest.useRealTimers();
  //   });
});
