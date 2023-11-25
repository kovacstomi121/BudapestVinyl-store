"use client";
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import getProducts from "@/actions/get-products";
import { Genre, Product } from "@/types";
import searchAlbums from "@/actions/search-albums";

interface SearchPageProps {
  searchParams: { query: string };
}

const SearchPage: React.FC<SearchPageProps> = ({ searchParams }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

    fetchData();
  }, [searchParams.query]);

  if (loading) {
    return <div className="text-center">Keresés...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center">Nincs ilyen termékünk</div>;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
