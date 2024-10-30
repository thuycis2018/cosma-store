import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductQuantityProps = {
  mode: Mode.SingleProduct;
  quantity: number;
  setQuantity: (value: number) => void;
};

type SelectCartItemQuantityProps = {
  mode: Mode.CartItem;
  quantity: number;
  setQuantity: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductQuantity(
  props: SelectProductQuantityProps | SelectCartItemQuantityProps
) {
  const { mode, quantity, setQuantity } = props;

  const cartItem = mode === Mode.CartItem;

  return (
    <>
      <Select
        defaultValue={quantity.toString()}
        onValueChange={(value) => setQuantity(Number(value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger className={cartItem ? "w-[100px]" : "w-[150px]"}>
          <SelectValue placeholder={quantity} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? quantity + 10 : 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={index} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
export default SelectProductQuantity;
