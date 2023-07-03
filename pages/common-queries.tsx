import { useState } from "react";
import { Transition } from "react-transition-group";

const queries = [
  {
    id: 1,
    question:
      "How can I share documents like banners or posters with other users while creating a project?",
    answer:
      "To share documents or images with other users while creating a project, you can use the 'External link' option. Simply generate a link for your document or image and share it using the external link feature. You can share specific links with pending users, accepted users, or rejected users as needed.",
  },
  {
    id: 2,
    question:
      "Will I be able to see the link for pending users once I have been accepted or rejected for the project?",
    answer:
      "No, you will not be able to see the link for pending users. You can only access the link if you have been accepted or rejected for the project.",
  },
  {
    id: 3,
    question: "Why am I seeing an 'Access Denied' page when signing in?",
    answer:
      "If you are seeing an 'Access Denied' page when signing in, it is likely because you are using a Google account that is not associated with the IITH domain. The IITH domain refers to the @iith.ac.in domain, and only accounts within this domain have access to the website. Please ensure that you sign in using an authorized IITH account.",
  },
  {
    id: 4,
    question: "Can I edit my project details after creating it?",
    answer:
      "No, editing project details after creation is not allowed. This restriction is in place to avoid misleading or confusing other users who may have already viewed your project. If you need to make changes to your project, we recommend deleting it and creating a new one. If you encounter any issues, please contact us via email for assistance.",
  },
  {
    id: 5,
    question: "Is it possible to leave any project details empty?",
    answer:
      "While it is not encouraged to leave any project details empty, optional fields can be left blank. However, we recommend providing information for all required fields. If a particular detail is not applicable, you can mention 'None' as the value.",
  },
  {
    id: 6,
    question:
      "I am unable to view the projects I saved earlier. How can I access them?",
    answer:
      "The projects you saved are stored locally on your device. If you are unable to view your saved projects, it is likely that the local storage on your device has been erased. Saved projects and favorite roles are tied to the same mechanism, so it is difficult to retrieve them once they are lost. We suggest saving them again or searching for them using the search bar on the available projects page. If you are using a different device where you haven't saved anything, we recommend searching for and saving them on that device as well.",
  },
  {
    id: 7,
    question: "Who has the authority to delete my project?",
    answer:
      "While the project owner has full control over the project presentation on the website, if any offensive or inappropriate content is found, the project may be temporarily disabled by the project manager or admin. The owner will be informed of the reason for its removal.",
  },
  {
    id: 8,
    question:
      "I am unable to view a project that I previously accessed. Why is that?",
    answer:
      "If you are unable to view a project that you had accessed before, it is likely that the project has been deleted by the project manager or admin.",
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
        <h1 className="text-3xl font-bold mb-8 p-8">
          Frequently Asked Questions
        </h1>
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
          <p>If your query is still unresolved, you can email us with that.</p>
        </div>
      </div>
    </div>
  );
}
