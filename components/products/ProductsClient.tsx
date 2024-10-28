"use client";

import { useSearchParams } from "next/navigation";
import ProductsContainer from "./ProductsContainer";

export default function ProductsClient({
  initialLayout = "grid",
  initialSearch = "",
}: {
  initialLayout?: string;
  initialSearch?: string;
}) {
  const searchParams = useSearchParams();
  const layout = searchParams.get("layout") || initialLayout;
  const search = searchParams.get("search") || initialSearch;

  return <ProductsContainer layout={layout} search={search} />;
}
