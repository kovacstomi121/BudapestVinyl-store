"use client";
// Itt a "client" oldali logikát hozza létre, amely kliensoldali kódokat tesz lehetővé, például adatlekéréseket.
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import searchAlbums from "@/actions/search-albums";
// Az interface definiálja a SearchPage komponens props-ait, ami egy 'searchParams' objektumot vár, amiben egy 'query' kulcs van
interface SearchPageProps {
  searchParams: { query: string };
}

// A SearchPage komponens, amely egy keresési oldalt jelenít meg
const SearchPage: React.FC<SearchPageProps> = ({ searchParams }) => {
  // Állapotok a termékek és a betöltés állapotának tárolására
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Effect hook, amely akkor fut le, amikor a searchParams.query megváltozik
  useEffect(() => {
    // Adatok lekérése a searchAlbums akció segítségével
    const fetchData = async () => {
      try {
        const result = await searchAlbums({
          query: searchParams.query,
        });
        setProducts(result);
      } catch (error) {
        console.error("Hiba történt:", error);
      } finally {
        setLoading(false);
      }
    };

    // Adatok lekérésének elindítása
    fetchData();
  }, [searchParams.query]);

  // Betöltési állapot kezelése
  if (loading) {
    return <div className="text-center">Keresés...</div>;
  }

  // Ha nincs találat, akkor egy üzenetet jelenítünk meg
  if (products.length === 0) {
    return <div className="text-center">Nincs ilyen termékünk</div>;
  }

  // A komponens JSX struktúrája
  return (
    <div className="bg-white" style={{ backgroundColor: "#99B080" }}>
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* A termékkártyák megjelenítése a keresési eredmények alapján */}
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;
