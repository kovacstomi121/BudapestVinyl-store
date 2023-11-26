import qs from "query-string";
import { Product } from "@/types";
// Az API végpont URL-je, amelyet a kód később használ
const URL = `${process.env.NEXT_PUBLIC_API_URL}/search`;

// Az lekérdezési paraméterek típusát definiáló interfész
interface Query {
  name?: string;
  artist?: string;
  query?: string;
}

// Egy aszinkron függvény, ami albumokat keres a megadott lekérdezési paraméterek alapján
const searchAlbums = async (query: Query): Promise<Product[]> => {
  // Az URL-et létrehozzuk a qs.stringifyUrl segítségével, amely összefűzi az alap URL-t a lekérdezési paraméterekkel
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      name: query.name,
      artist: query.artist,
      query: query.query,
    },
  });

  // Elkérjük az albumokat az API-ról a fetch függvénnyel
  const res = await fetch(url);

  // A válasz (response) JSON formátumban érkezik, ezt átalakítjuk és visszaadjuk
  return res.json();
};

// Exportáljuk a searchAlbums függvényt, hogy más modulok is használni tudják
export default searchAlbums;
