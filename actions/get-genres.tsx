import { Genre } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/genres`;

// Egy aszinkron függvény, ami egy konkrét műfajt lekér a megadott azonosító alapján
const getGenres = async (): Promise<Genre[]> => {
  // Elkérjük az adott műfajt az API-ról a fetch függvénnyel
  const res = await fetch(URL);

  // A válasz (response) JSON formátumban érkezik, ezt átalakítjuk és visszaadjuk
  return res.json();
};

export default getGenres;
