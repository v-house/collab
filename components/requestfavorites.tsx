import { useRouter } from "next/router";

const ReqFavorites = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/favorites");
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-base md:text-lg">
            You can edit favorites roles to find collaborations easily.
          </h1>
          <button
            className="px-3 py-1 bg-white text-purple-500 rounded-lg shadow text-sm"
            onClick={handleClick}
          >
            Edit Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReqFavorites;
