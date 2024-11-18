import { fetchProductReviews } from "@/utils/actions";

import ReviewCard from "./ReviewCard";
import SectionTitle from "../global/SectionTitle";
async function ProductReviews({ productId }: { productId: string }) {
  console.log(productId);
  const reviews = await fetchProductReviews(productId);
  console.log(reviews);
  return (
    <div className='mt-16'>
      <SectionTitle text='reviews' />

      <div className='grid md:grid-cols-2 gap-8 my-8'>
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName } = review;
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}
export default ProductReviews;
