import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
//import NavSearch from "./NavSearch";
// import { Suspense } from "react";
function Navbar() {
  return (
    <nav className='border-b shadow-md'>
      <Container className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-8 gap-4 sm:gap-1'>
        <div className='flex gap-4 items-center'>
          <Logo />
          <DarkMode />
        </div>
        <div className='flex gap-4 items-center'>
          <CartButton />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
