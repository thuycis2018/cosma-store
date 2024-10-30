"use client";
import { useState } from "react";
import SelectProductQuantity from "../single-product/SelectProductQuantity";
import { Mode } from "../single-product/SelectProductQuantity";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { useToast } from "../ui/use-toast";

function ThirdColumn({ quantity, id }: { quantity: number; id: string }) {
  const [qty, setQty] = useState(quantity);

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleQuantityChange = async (value: number) => {
    setIsLoading(true);
    toast({ description: "Calculating..." });
    const result = await updateCartItemAction({
      quantity: value,
      cartItemId: id,
    });
    setQty(value);
    toast({ description: result.message });
    setIsLoading(false);
  };

  return (
    <div className='md:ml-8'>
      <SelectProductQuantity
        quantity={quantity}
        setQuantity={handleQuantityChange}
        mode={Mode.CartItem}
        isLoading={isLoading}
      />
      <FormContainer action={removeCartItemAction}>
        <input type='hidden' name='id' value={id} />
        <SubmitButton size='sm' className='mt-4' text='remove' />
      </FormContainer>
    </div>
  );
}
export default ThirdColumn;
