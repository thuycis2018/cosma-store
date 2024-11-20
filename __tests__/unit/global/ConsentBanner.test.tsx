import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConsentBanner from "@/components/global/ConsentBanner";

beforeEach(() => {
  localStorage.clear();
});

beforeAll(() => {
  global.window.gtag = jest.fn();
});

describe("ConsentBanner", () => {
  it("renders the banner by default", () => {
    render(<ConsentBanner />);
    expect(screen.getByText(/We value your privacy/i)).toBeInTheDocument();
  });

  it("does not show the banner if consent is already saved", async () => {
    const savedConsent = {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      personalization_storage: "granted",
      functionality_storage: "granted",
      security_storage: "granted",
    };
    localStorage.setItem("consentMode", JSON.stringify(savedConsent));

    render(<ConsentBanner />);

    await waitFor(() => {
      expect(
        screen.queryByText(/We value your privacy/i)
      ).not.toBeInTheDocument();
    });
  });

  it("handles checkbox change and updates state", async () => {
    render(<ConsentBanner />);

    const analyticsCheckbox = screen.getByLabelText(
      /Analytics/i
    ) as HTMLInputElement;
    fireEvent.click(analyticsCheckbox);

    await waitFor(() => {
      expect(analyticsCheckbox.checked).toBe(true);
    });
  });

  it("accepts all cookies and hides the banner", async () => {
    render(<ConsentBanner />);

    const acceptAllButton = screen.getByText(/Accept All/i);
    fireEvent.click(acceptAllButton);

    // Check if gtag was called
    expect(window.gtag).toHaveBeenCalledWith(
      "consent",
      "update",
      expect.anything()
    );

    await waitFor(() => {
      expect(localStorage.getItem("consentMode")).toBeDefined();
      expect(
        screen.queryByText(/We value your privacy/i)
      ).not.toBeInTheDocument();
    });
  });

  it("accepts selected cookies and hides the banner", async () => {
    render(<ConsentBanner />);

    const analyticsCheckbox = screen.getByLabelText(/Analytics/i);
    fireEvent.click(analyticsCheckbox);

    const acceptSelectionButton = screen.getByText(/Accept Selection/i);
    fireEvent.click(acceptSelectionButton);

    await waitFor(() => {
      expect(localStorage.getItem("consentMode")).toBeDefined();
      expect(
        screen.queryByText(/We value your privacy/i)
      ).not.toBeInTheDocument();
    });
  });

  it("rejects all cookies and hides the banner", async () => {
    render(<ConsentBanner />);

    const rejectAllButton = screen.getByText(/Reject All/i);
    fireEvent.click(rejectAllButton);

    await waitFor(() => {
      expect(localStorage.getItem("consentMode")).toBeDefined();
      expect(
        screen.queryByText(/We value your privacy/i)
      ).not.toBeInTheDocument();
    });
  });
});
