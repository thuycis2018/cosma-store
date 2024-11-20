import { render, screen } from "@testing-library/react";
import LoadingTable from "@/components/global/LoadingTable";

describe("LoadingTable", () => {
  it("renders the correct number of skeleton rows", () => {
    render(<LoadingTable rows={5} />);

    const skeletonRows = screen.getAllByRole("presentation");
    expect(skeletonRows.length).toBe(5);
  });

  it("renders default skeleton rows when no rows prop is passed", () => {
    render(<LoadingTable />);

    const skeletonRows = screen.getAllByRole("presentation");
    expect(skeletonRows.length).toBe(5);
  });

  it("each skeleton has correct classes", () => {
    render(<LoadingTable rows={3} />);

    const skeletonRows = screen.getAllByRole("presentation");
    skeletonRows.forEach((skeleton) => {
      expect(skeleton).toHaveClass("w-full", "h-8", "rounded");
    });
  });
});
