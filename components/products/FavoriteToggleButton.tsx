import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
function FavoriteToggleButton({ productId }: { productId: string }) {
  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'>
      <BsFillHandThumbsUpFill />
    </Button>
  );
}
export default FavoriteToggleButton;
