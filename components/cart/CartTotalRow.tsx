import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
const CartTotalRow = ({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) => {
  return (
    <>
      <p className='flex justify-between text-sm'>
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className='my-2' role='separator' />}
    </>
  );
};
export default CartTotalRow;
