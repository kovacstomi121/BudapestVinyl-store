import Link from "next/link";
import MainNav from "@/components/main-nav";
import Image from "next/image";
import logo from "@/assets/logo.png";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import SearchBar from "./SearchBar";
import getProducts from "@/actions/get-products";
import { SearchInput } from "./search-input";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
          <Image src={logo} alt="Logo" width="250" height="74" />
        </Link>

        <SearchBar />
        <NavbarActions />
      </div>
    </div>
  );
};

export default Navbar;
