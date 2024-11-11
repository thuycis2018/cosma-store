//import { BsFillHandThumbsUpFill } from "react-icons/bs";
//import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "@/components/form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "@/components/products/FavoriteToggleForm";
async function FavoriteToggleButton({ productId }: { productId: string }) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ productId });

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
}
export default FavoriteToggleButton;
