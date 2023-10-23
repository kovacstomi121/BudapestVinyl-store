import { Genre } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/genre`;

const getGenre = async (id: string): Promise<Genre> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getGenre;
