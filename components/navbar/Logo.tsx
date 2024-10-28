import Link from "next/link";
import { Button } from "../ui/button";
import { VscCode } from "react-icons/vsc";
import Image from "next/image";
import logo from "@/app/logo.png";

function Logo() {
  return (
    <Button variant='outline' size='icon' className='bg-transparent' asChild>
      <Link href='/'>
        <Image
          src={logo}
          alt='Cosma logo'
          width={24}
          height={24}
          className='w-6 h-6'
        />
      </Link>
    </Button>
  );
}
export default Logo;
