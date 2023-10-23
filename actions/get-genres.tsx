import { Genre } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/genres`;

const getGenres = async (): Promise<Genre[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getGenres;
