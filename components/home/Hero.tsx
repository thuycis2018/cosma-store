import Link from "next/link";
import { Button } from "@/components/ui/button";
import Animation from "@/components/home/Animation";

function Hero() {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl"'>
          <span className='animate-spin'>FPGA</span> Design Services
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8 text-muted-foreground'>
          Top-tier FPGA expertise for AI, finance, and tech. Reliable, fast, and
          effective!
        </p>
        <Button
          asChild
          size='lg'
          className='mt-10 shadow-md transform hover:shadow-xl transition-shadow duration-500"'
        >
          <Link href='/products'>Our Offers</Link>
        </Button>
      </div>
      <div className='hidden lg:block'>
        <Animation />
      </div>
    </section>
  );
}
export default Hero;
