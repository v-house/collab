import { useRouter } from "next/router";
import MotivesAndAims from "../components/MotiveAims";
import ServerIssueMessage from "../components/ServerIssueMessage";
import Whatis from "../components/Whatis";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/terms-and-conditions");
  };

  return (
    <>
      <Whatis />
      <div className="bg-gray-100">
        <MotivesAndAims />
      </div>
      <div className="flex flex-col items-center justify-center mt-8 mb-8">
        <div
          className="border border-gray-300 shadow-md rounded-lg p-8 flex items-center space-x-4 cursor-pointer transition-all duration-300 hover:bg-gray-200"
          onClick={handleButtonClick}
        >
          <span className="text-xl font-bold">
            View our Terms and Conditions
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
