import { emptyCart } from "@/utils/actions";
import { redirect } from "next/navigation";

export const GET = async () => {
  emptyCart();
  redirect("/cart");
};
