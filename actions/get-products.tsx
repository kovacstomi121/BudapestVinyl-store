import { Product } from "@/types";
// Importáljuk be a "query-string" modult, amely segítségével könnyen kezelhetjük a lekérdezési paramétereket
import qs from "query-string";

// Az API végpont URL-je, amelyet a kód később használ
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

// Az lekérdezési paraméterek típusát definiáló interfész
interface Query {
  genreId?: string;
  isFeatured?: boolean;
}

// Egy aszinkron függvény, ami termékeket kér le a megadott lekérdezési paraméterek alapján
const getProducts = async (query: Query): Promise<Product[]> => {
  // Az URL-et létrehozzuk a qs.stringifyUrl segítségével, amely összefűzi az alap URL-t a lekérdezési paraméterekkel
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      genreId: query.genreId,
      isFeatured: query.isFeatured,
    },
  });

  // Elkérjük a termékeket az API-ról a fetch függvénnyel
  const res = await fetch(url);

  // A válasz (response) JSON formátumban érkezik, ezt átalakítjuk és visszaadjuk
  return res.json();
};

// Exportáljuk a getProducts függvényt, hogy más modulok is használni tudják
export default getProducts;
