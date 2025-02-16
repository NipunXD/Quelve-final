const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-black text-black dark:text-white p-4 font-lg text-md">
        <div className="container mx-auto flex justify-center items-center">
            <aside>
            <p>Copyright © {new Date().getFullYear()} - All rights reserved by Quelve Pvt Ltd</p>
            </aside>
        </div>
    </footer>
  );
}
export default Footer;