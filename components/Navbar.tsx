import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <nav className="flex justify-center items-center h-16 bg-gray-800">
      <a
        href="/"
        onClick={handleClick}
        className="text-white text-xl font-bold hover:text-gray-300 cursor-pointer absolute left-1/2 transform -translate-x-1/2"
      >
        Collab@IITH
      </a>
    </nav>
  );
};

export default Navbar;
