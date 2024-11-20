import { render } from "@testing-library/react";
import ClientAnalytics from "@/components/global/ClientAnalytics";
import { usePathname } from "next/navigation";
import { initGA, logPageView } from "@/lib/ga";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/lib/ga", () => ({
  initGA: jest.fn(),
  logPageView: jest.fn(),
}));

describe("ClientAnalytics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls initGA and logPageView when GA_MEASUREMENT_ID is set", () => {
    (usePathname as jest.Mock).mockReturnValue("/test-path");

    render(<ClientAnalytics />);

    expect(initGA).toHaveBeenCalledWith("TEST");
    expect(logPageView).toHaveBeenCalledWith("/test-path");
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  });
});
