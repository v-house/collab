import { useState } from "react";

const queries = [
  {
    id: 1,
    question:
      "You're welcome! I'm glad I could assist you. If you have any more questions, feel free to ask. Happy coding!",
    answer: "Answer 1",
  },
  {
    id: 2,
    question: "Question 2",
    answer: "Answer 2",
  },
  {
    id: 3,
    question:
      "Very long question that may exceed the container width and need wrapping to a new line",
    answer:
      "Very long answer that may exceed the container width and need wrapping to a new line",
  },
];

export default function IndexPage() {
  const [openQueryId, setOpenQueryId] = useState<number | null>(null);

  const handleQueryClick = (id: number) => {
    setOpenQueryId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-8">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 p-8">Frequently faced Issues</h1>
        {queries.map((query) => (
          <div
            key={query.id}
            className={`bg-white rounded-lg shadow-lg mb-4 ${
              openQueryId === query.id ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <div
              className={`p-4 cursor-pointer ${
                openQueryId === query.id ? "bg-blue-100" : "bg-gray-100"
              }`}
              onClick={() => handleQueryClick(query.id)}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-left">
                  {query.question}
                </h2>
                <div className="transform transition-transform">
                  <svg
                    className={`w-6 h-6 ml-2 ${
                      openQueryId === query.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {openQueryId === query.id && (
              <div className="p-4">
                <p className="text-left">{query.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
