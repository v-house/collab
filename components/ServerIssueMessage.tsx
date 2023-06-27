import { useState, useEffect } from "react";

const ServerIssueMessage = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showMessage && (
        <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white py-2 px-4 text-sm">
          <p className="font-medium">
            Notice: The server is currently experiencing issues. Please try
            again later.
          </p>
          <p className="mt-1">We apologize for any inconvenience caused.</p>
        </div>
      )}
    </>
  );
};

export default ServerIssueMessage;
