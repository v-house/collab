import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center space-x-2 text-gray-600">
        <FaSpinner className="animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
