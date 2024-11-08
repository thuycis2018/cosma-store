import BlogsList from "./BlogsList";
import { Separator } from "@/components/ui/separator";
import { fetchAllBlogs } from "@/utils/actions";

async function BlogsContainer({ search }: { search: string }) {
  const blogs = await fetchAllBlogs({ search });
  const totalBlogs = blogs.length;
  const searchTerm = search ? `&search=${search}` : "";
  return (
    <>
      <section>
        <div className='flex justify-between items-center'>
          <h4 className='font-medium text-lg'>
            {totalBlogs} blog{totalBlogs > 1 && "s"}
          </h4>
        </div>
        <Separator className='mt-4' />
      </section>
      <div>
        {totalBlogs === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no items matched your search...
          </h5>
        ) : (
          <BlogsList blogs={blogs} />
        )}
      </div>
    </>
  );
}
export default BlogsContainer;
