import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import HeroCarousel from "@/components/home/HeroCarousel";

jest.mock("@/app/slider1.svg", () => "slider1.svg");
jest.mock("@/app/slider2.svg", () => "slider2.svg");

jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CarouselContent: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  CarouselItem: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  CarouselPrevious: () => <button>Previous</button>,
  CarouselNext: () => <button>Next</button>,
}));

describe("HeroCarousel Component", () => {
  it("renders carousel items with images", () => {
    render(<HeroCarousel />);
    expect(screen.getAllByAltText("hero")).toHaveLength(2);
    const images = screen.getAllByAltText("hero");
    images.forEach((img) => {
      expect(img).toHaveClass("w-full h-[24rem] rounded-md object-cover");
    });
  });

  it("renders the Carousel navigation buttons", () => {
    render(<HeroCarousel />);
    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });
});
