"use client";
import { useState } from "react";
import SelectProductQuantity from "./SelectProductQuantity";
import { Mode } from "./SelectProductQuantity";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { ProductSignInButton } from "../form/Buttons";

function AddToCart({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const { userId } = useAuth();

  return (
    <div className='mt-4'>
      <SelectProductQuantity
        mode={Mode.SingleProduct}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type='hidden' name='productId' value={productId} />
          <input type='hidden' name='quantity' value={quantity} />
          <SubmitButton text='add to cart' size='default' className='mt-8' />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}
export default AddToCart;
