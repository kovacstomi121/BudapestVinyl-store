"use client";
import { BiSearch } from "react-icons/bi";
import { redirect, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = {};

const SearchBar = (props: Props) => {
  const router = useRouter();
  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    handleSearch(searchQuery);
  };
  return (
    <div>
      <div className="flex items-center bg-gray-100 p-2 rounded-full md:max:hidden">
        <button>
          <BiSearch size={20} className="opacity-50" />
        </button>

        <input
          onChange={handleChange}
          name="searchQuery"
          className="outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
          placeholder="Albumok keresése"
          autoComplete="false"
        />
      </div>
    </div>
  );
};

export default SearchBar;
