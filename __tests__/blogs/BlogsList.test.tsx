import { render, screen } from "@testing-library/react";
import BlogsList from "@/components/blogs/BlogsList";
import { Blog } from "@prisma/client";

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-card'>{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-card-content'>{children}</div>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-link'>{children}</div>
  ),
}));

describe("BlogsList Component", () => {
  const mockBlogs: Blog[] = [
    {
      id: "1",
      title: "blog 1",
      text: "blog 1 text",
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "1",
      authorName: "author",
      slug: "blog1",
    },
    {
      id: "2",
      title: "blog 2",
      text: "blog 2 text",
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "1",
      authorName: "author",
      slug: "blog2",
    },
  ];

  it("renders the blogs list correctly", () => {
    render(<BlogsList blogs={mockBlogs} />);

    mockBlogs.forEach((blog) => {
      expect(screen.getByText(blog.title)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("mock-card")).toHaveLength(mockBlogs.length);
  });
});
