import BlogsContainer from "@/components/blogs/BlogsContainer";

async function BlogsPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const search = (await searchParams?.search) || "";

  return <BlogsContainer search={search} />;
}

export default BlogsPage;
