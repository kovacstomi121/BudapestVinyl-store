"use client";
import { BiSearch } from "react-icons/bi";
import { redirect, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = {};

// A SearchBar komponens definíciója
const SearchBar = (props: Props) => {
  // useRouter hook használata
  const router = useRouter();

  // useDebouncedCallback használata a keresési lekérések késleltetésére
  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    if (searchQuery) {
      // Átirányítás a keresési oldalra a keresési lekérdezés átadásával
      router.push(`/search?query=${searchQuery}`);
    }
  }, 500);

  // A keresőmező tartalmának változását kezelő függvény
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    // A keresési lekérést késleltetett callback-ként hívja meg
    handleSearch(searchQuery);
  };

  // A SearchBar komponens JSX struktúrája
  return (
    <div>
      <div className="flex items-center bg-gray-100 p-2 rounded-full md:max:hidden">
        {/* Keresés gomb */}

        <button>
          <BiSearch size={20} className="opacity-50" />
        </button>

        {/* Keresőmező */}
        <input
          onChange={handleChange}
          name="searchQuery"
          className="outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px] w-full"
          placeholder="Keresés"
          autoComplete="false"
        />
      </div>
    </div>
  );
};

export default SearchBar;
