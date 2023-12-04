import ProductList from "@/components/product-list";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Container from "@/components/ui/container";
import Info from "@/components/info";
import Gallery from "@/components/gallery";
// Az interface definiálja a ProductPage komponens props-ait, ami egy 'params' objektumot vár, amiben egy 'productId' kulcs van
interface ProductPageProps {
  params: {
    productId: string;
  };
}

// A ProductPage komponens, amely egy termékoldalt jelenít meg
const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  // A termék lekérése a getProduct akció segítségével
  const product = await getProduct(params.productId);

  // Az ajánlott termékek lekérése a getProducts akció segítségével
  const suggestedProducts = await getProducts({
    genreId: product?.genre?.id,
  });

  // Ha nincs ilyen termék, akkor null-t renderelünk
  if (!product) {
    return null;
  }

  // A termékoldal JSX struktúrája
  return (
    <div className="bg-white" style={{ backgroundColor: "#99B080" }}>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* A termék képgalériájának komponense */}
            <Gallery images={product.images} />

            {/* A termék információinak komponense */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10 border-t-1 border-black" />
          {/* Ajánlott termékek listájának komponense */}
          <ProductList title="Hasonló albumok" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
