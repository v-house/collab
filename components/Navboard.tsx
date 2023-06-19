import Link from "next/link";
import { useEffect, useState } from "react";

const Navboard = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-gray-800 ${
        isSticky ? "fixed top-0 left-0 w-full z-50" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex justify-center flex-grow">
            <div className="flex space-x-4">
              <NavLink href="/projects" label="Available" />
              <NavLink href="/addproject" label="Hire Now" />
              <NavLink href="/profile" label="My Projects" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = (props: { href: any; label: any }) => {
  return (
    <Link href={props.href}>
      <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        {props.label}
      </button>
    </Link>
  );
};

export default Navboard;
