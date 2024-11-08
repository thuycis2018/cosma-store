import BreadCrumbs from "@/components/single-blog/BreadCrums";
import { fetchSingleBlog } from "@/utils/actions";

async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await fetchSingleBlog(params.id);
  const { title, text } = blog;
  return (
    <section>
      <BreadCrumbs name={blog.title} />
      <div className='mt-6'>
        <div>
          <div className='items-center'>
            <h1 className='capitalize text-3xl font-bold mb-4 text-center'>
              {title}
            </h1>
            <p className='text-sm leading-loose'>{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BlogPage;
