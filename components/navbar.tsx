import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import NavbarActions from "./navbar-actions";
import SearchBar from "./SearchBar";
import Container from "@/components/ui/container";

// A Navbar komponens, amely a navigációs sáv felső részét és tartalmát definiálja
const Navbar = async () => {
  return (
    <div>
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          {/* A weboldal gyökérére mutató Link komponens */}
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            {/* A weboldal logóját megjelenítő Image komponens */}
            <Image src={logo} alt="Logo" width="250" height="74" />
          </Link>

          {/* A keresősáv komponens */}
          <SearchBar />

          {/* A navigációs sáv műveleteit kezelő komponens */}
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
