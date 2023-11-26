import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
// Egy aszinkron függvény, ami egy konkrét terméket lekér a megadott azonosító alapján
const getProduct = async (id: string): Promise<Product> => {
  // Elkérjük az adott terméket az API-ról a fetch függvénnyel
  const res = await fetch(`${URL}/${id}`);
  // A válasz (response) JSON formátumban érkezik, ezt átalakítjuk és visszaadjuk
  return res.json();
};

export default getProduct;
