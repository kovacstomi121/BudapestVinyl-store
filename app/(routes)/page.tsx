import getBillboard from "@/actions/get-billboard";

import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import getProducts from "@/actions/get-products";
import MobileFilters from "./genre/[genreId]/components/mobile-filters";
import Filter from "./genre/[genreId]/components/filter";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";
import getGenres from "@/actions/get-genres";
import { Pagination } from "@/components/pagination";

// Az interface definiálja a HomePage komponens props-ait, ami egy 'searchParams' objektumot vár, amiben egy 'page' és 'genreId' kulcsok vannak
interface HomePageProps {
  searchParams: {
    page: number;
    genreId: string;
  };
}

// A HomePage komponens, amely egy főoldalt jelenít meg
const HomePage: React.FC<HomePageProps> = async ({ searchParams }) => {
  // A featured termékek lekérése a getProducts akció segítségével
  const products = await getProducts({
    genreId: searchParams.genreId,
    isFeatured: true,
  });

  // A lapozás összes oldalának száma
  const totalPages = 8;

  // A jelenlegi oldalszám
  const currentPage = Number(searchParams.page) || 1;

  // A műfajok lekérése a getGenres akció segítségével
  const genres = await getGenres();

  // A billboard lekérése a getBillboard akció segítségével
  const billboard = await getBillboard("9c371d15-f8cc-4f0e-8872-087671afe447");

  // A komponens JSX struktúrája
  return (
    <Container>
      <div className="space-y-10 pb-10">
        {/* A Billboard komponens megjelenítése */}
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* A mobil szűrők megjelenítése */}
            <MobileFilters genres={genres} />

            {/* A szűrők megjelenítése (laptop és nagyobb méretű eszközökön) */}
            <div className="hidden lg:block">
              <Filter valueKey="genreId" name="Műfajok" data={genres} />
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {/* Ha nincs találat, akkor a NoResults komponens megjelenítése */}
              {products.length === 0 && <NoResults />}

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* A termékkártyák megjelenítése a featured termékekből */}

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

// Exportáljuk a HomePage komponenst, hogy más komponensek is használhassák
export default HomePage;
