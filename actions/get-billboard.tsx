import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

// Egy aszinkron függvény, ami egy konkrét hirdetőtáblát lekér a megadott azonosító alapján
const getBillboard = async (id: string): Promise<Billboard> => {
  // Elkérjük az adott hirdetőtáblát az API-ról a fetch függvénnyel
  const res = await fetch(`${URL}/${id}`);

  // A válasz (response) JSON formátumban érkezik, ezt átalakítjuk és visszaadjuk
  return res.json();
};

export default getBillboard;
