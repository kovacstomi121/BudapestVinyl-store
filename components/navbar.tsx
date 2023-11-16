import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import Image from "next/image";

import logo from "@/assets/logo.png";

import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { ThemeToggle } from "./theme-toggle";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <Image src={logo} alt="Logo" width="250" height="74" />
          </Link>
          <MainNav data={categories} />
            <ThemeToggle />
          <NavbarActions />
          
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
