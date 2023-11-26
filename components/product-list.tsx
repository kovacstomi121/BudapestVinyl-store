import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";

// A ProductListProps interfész definiálása
interface ProductListProps {
  title: string;
  items: Product[];
}

// A ProductList komponens definíciója
const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  // A ProductList komponens JSX struktúrája
  return (
    <div className="space-y-4">
      {/* A terméklista címének megjelenítése */}
      <h3 className="font-bold text-3xl">{title}</h3>

      {/* Ellenőrzés, hogy van-e elem a listában, és megjelenítése */}
      {items.length === 0 && <NoResults />}

      {/* A terméklista megjelenítése egy rácsban */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Az elemek (termékek) megjelenítése a ProductCard komponens segítségével */}
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
