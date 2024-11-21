import Container from "../global/Container";
import CartButton from "./CartButton";
import ThemeToggle from "./ThemeToggle";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
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
