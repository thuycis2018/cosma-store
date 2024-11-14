import { render, screen } from "@testing-library/react";
import LoadingContainer from "@/components/global/LoadingContainer";
import { LoadingProductDetail } from "@/components/global/LoadingContainer";

describe("LoadingContainer", () => {
  it("renders a loading skeleton for multiple products", () => {
    render(<LoadingContainer />);
    const skeletons = document.querySelectorAll(".h-48.w-full");

    expect(skeletons.length).toBe(3);
  });

  it("renders correct skeleton structure in each product", () => {
    render(<LoadingContainer />);

    const skeletons = document.querySelectorAll(".h-48.w-full");
    skeletons.forEach((skeleton) => {
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("h-48", "w-full");
    });
    const smallerSkeletons = document.querySelectorAll(".h-4");

    expect(smallerSkeletons.length).toBe(6); // Each LoadingProduct has 3 smaller skeletons
  });
});

describe("LoadingProductDetail", () => {
  it("renders a loading skeleton for product details", () => {
    render(<LoadingProductDetail />);

    const largeSkeleton = document.querySelector(".h-96.w-full");
    expect(largeSkeleton).toBeInTheDocument();
    expect(largeSkeleton).toHaveClass("h-96", "w-full");

    const smallSkeletons = document.querySelectorAll(".h-4");
    expect(smallSkeletons.length).toBe(6);
  });
});
