import { render, screen } from "@testing-library/react";
import UserIcon from "@/components/navbar/UserIcon";

jest.mock("@clerk/nextjs/server", () => ({
  currentUser: jest.fn(),
}));

describe("UserIcon", () => {
  it("renders the profile image if the user has one", async () => {
    const { currentUser } = require("@clerk/nextjs/server");
    currentUser.mockResolvedValue({
      imageUrl: "/image.jpg",
    });

    render(await UserIcon());
    const imageElement = await screen.findByRole("img");

    expect(imageElement).toHaveAttribute("src", "/image.jpg");
    expect(imageElement).toHaveClass("w-6 h-6 rounded-full object-cover");
  });

  it("renders the default icon if the user has no profile image", async () => {
    const { currentUser } = require("@clerk/nextjs/server");
    currentUser.mockResolvedValue(null);

    render(await UserIcon());
    const iconElement = await screen.findByTestId("LuUser2");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass(
      "w-6 h-6 bg-primary rounded-full text-white"
    );
  });
});
