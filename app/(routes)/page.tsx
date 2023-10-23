import getBillboard from "@/actions/get-billboard";

import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import getProducts from "@/actions/get-products";
import MobileFilters from "./genre/[genreId]/components/mobile-filters";
import Filter from "./genre/[genreId]/components/filter";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";
import getGenres from "@/actions/get-genres";

export const revalidate = 0;

interface HomePageProps {
  searchParams: {
    genreId: string;
  };
}

const HomePage: React.FC<HomePageProps> = async ({ searchParams }) => {
  const products = await getProducts({
    genreId: searchParams.genreId,
  });
  const genres = await getGenres();
  const billboard = await getBillboard("f2d8e489-aff4-4176-90f2-96d573a3168f");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters genres={genres} />
            <div className="hidden lg:block">
              <Filter valueKey="genreId" name="Műfajok" data={genres} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
