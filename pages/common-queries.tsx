import { useState } from "react";
import { Transition } from "react-transition-group";

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

  const duration = 10; // Transition duration in milliseconds

  const defaultStyle = {
    transition: `max-height ${duration}ms ease-in-out`,
    maxHeight: "0px",
    overflow: "hidden",
  };

  const transitionStyles: { [key: string]: React.CSSProperties } = {
    entering: { maxHeight: "0px" },
    entered: { maxHeight: "1000px" },
    exiting: { maxHeight: "0px" },
    exited: { maxHeight: "0px" },
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-8">
      <div className="max-w-3xl w-full lg:w-3/4">
        <h1 className="text-3xl font-bold mb-8 p-8">Frequently Faced Issues</h1>
        {queries.map((query) => (
          <div
            key={query.id}
            className="bg-white rounded-md shadow-lg mb-4 border-gray-200"
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
                <div className="ml-2">
                  <svg
                    className={`w-6 h-6 ${
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
            <Transition
              in={openQueryId === query.id}
              timeout={duration}
              unmountOnExit
            >
              {(state) => (
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                  className="p-4"
                >
                  <p className="text-left">{query.answer}</p>
                </div>
              )}
            </Transition>
          </div>
        ))}
        <div className="p-4 text-center">
          <p>
            If your query is still unresolved, you can email us at xyz@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
