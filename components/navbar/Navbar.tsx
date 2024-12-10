import Container from "@/components/global/Container";
import CartButton from "@/components/navbar/CartButton";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import LinksDropdown from "@/components/navbar/LinksDropdown";
import Logo from "@/components/navbar/Logo";
//import NavSearch from "./NavSearch";
// import { Suspense } from "react";
function Navbar() {
  return (
    <nav className='border-b shadow-md'>
      <Container className='flex flex-row justify-between items-center py-8 gap-4'>
        <div>
          <Logo />
        </div>
        <div className='flex gap-4 items-center'>
          <CartButton />
          <ThemeToggle />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
