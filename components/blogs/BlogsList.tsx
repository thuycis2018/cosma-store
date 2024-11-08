import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Blog } from "@prisma/client";
function BlogsList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className='mt-12 grid gap-y-8'>
      {blogs.map((blog) => {
        const { title } = blog;
        const blogId = blog.id;
        return (
          <article key={blogId} className='group relative'>
            <Link href={`/blogs/${blogId}`}>
              <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-8'>
                  <h2 className='text-xl font-semibold capitalize'>{title}</h2>
                </CardContent>
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
export default BlogsList;
