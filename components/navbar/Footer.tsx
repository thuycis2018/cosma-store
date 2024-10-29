function Footer() {
  return (
    <footer className='p-4 text-center md:mt-10 border-t'>
      &copy; <span id='date'>{new Date().getFullYear()}</span> Cosma Services
      LLC
    </footer>
  );
}
export default Footer;
