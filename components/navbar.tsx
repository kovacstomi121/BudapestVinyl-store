import Link from "next/link";
import MainNav from "@/components/main-nav";
import Image from "next/image";
import logo from "@/assets/logo.png";
import NavbarActions from "./navbar-actions";
import SearchBar from "./SearchBar";
import Container from "@/components/ui/container";

export const revalidate = 0;

const Navbar = async () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <Image src={logo} alt="Logo" width="250" height="74" />
          </Link>

          <SearchBar />

          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
