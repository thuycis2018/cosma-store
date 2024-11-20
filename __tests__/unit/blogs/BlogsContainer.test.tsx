import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogsContainer from "@/components/blogs/BlogsContainer";
import { fetchAllBlogs } from "@/utils/actions";

jest.mock("@/utils/actions", () => ({
  fetchAllBlogs: jest.fn(),
}));

jest.mock("@/components/blogs/BlogsList", () => () => (
  <div data-testid='mock-blog-list'>Mock Blog List</div>
));

jest.mock("next/link", () => {
  return ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe("BlogsContainer", () => {
  beforeAll(() => {
    Object.defineProperty(window, "history", {
      value: {
        pushState: jest.fn(),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    (fetchAllBlogs as jest.Mock).mockResolvedValue([
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
    ]);
  });

  it("renders the correct number of products", async () => {
    render(await BlogsContainer({ search: "" }));

    await waitFor(() => screen.getByText("2 blogs"));

    expect(screen.getByText("2 blogs")).toBeInTheDocument();
  });

  it("renders the empty state when no blogs are found", async () => {
    (fetchAllBlogs as jest.Mock).mockResolvedValue([]);
    render(await BlogsContainer({ search: "nonexistent" }));

    await waitFor(() =>
      screen.getByText("Sorry, no items matched your search...")
    );

    expect(
      screen.getByText("Sorry, no items matched your search...")
    ).toBeInTheDocument();
  });
});
