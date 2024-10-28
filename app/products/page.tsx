import ProductsContainer from "@/components/products/ProductsContainer";

async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = (await searchParams?.layout) || "grid";
  const search = (await searchParams?.search) || "";

  return <ProductsContainer layout={layout} search={search} />;
}

export default ProductsPage;

// import ProductsClient from "@/components/products/ProductsClient";
// function ProductsPage({
//   searchParams,
// }: {
//   searchParams: { layout?: string; search?: string };
// }) {
//   return (
//     <ProductsClient
//       initialLayout={searchParams.layout}
//       initialSearch={searchParams.search}
//     />
//   );
// }

// export default ProductsPage;
