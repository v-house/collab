import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const InfoIcon = (props: { message: any }) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div
      className="relative ml-2"
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      <FaInfoCircle className="text-gray-400 cursor-pointer" size={16} />
      {showMessage && (
        <div className="absolute z-10 p-2 text-sm bg-white border border-gray-300 rounded-md shadow-md mt-2 w-48">
          {props.message}
        </div>
      )}
    </div>
  );
};

export default InfoIcon;
