"use client";
import { Card } from "@/components/ui/card";
import {
  FirstColumn,
  SecondColumn,
  FourthColumn,
} from "@/components/cart/CartItemColumns";
import ThirdColumn from "@/components/cart/ThirdColumn";
import { CartItemWithProduct } from "@/utils/types";
function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, quantity } = cartItem;
        const { id: productId, image, name, company, price } = cartItem.product;
        return (
          <Card
            key={id}
            className='flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4'
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} productId={productId} />
            <ThirdColumn id={id} quantity={quantity} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
}
export default CartItemsList;
