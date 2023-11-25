import qs from "query-string";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/search`;

interface Query {
  name?: string;
  artist?: string;
  query?: string;
}

const searchAlbums = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      name: query.name,
      artist: query.artist,
      query: query.query,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default searchAlbums;
