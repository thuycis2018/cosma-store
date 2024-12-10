"use client";
import { useState } from "react";
import SelectProductQuantity from "@/components/single-product/SelectProductQuantity";
import { Mode } from "@/components/single-product/SelectProductQuantity";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { ProductSignInButton } from "@/components/form/Buttons";

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
