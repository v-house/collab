import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Feedback = (props: { session: any }) => {
  const {
    user: { email, name },
  } = props.session;

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (showUpdate) {
      const timer = setTimeout(() => {
        setShowUpdate(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showUpdate]);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setShowUpdate(true);

    // Clear the form
    setRating(0);
    setFeedback("");
    setSuggestions("");
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4 w-96">
          <h1 className="text-2xl font-bold mb-6">Feedback</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                value={name}
                disabled
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                value={email}
                disabled
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-gray-700 font-bold mb-2"
              >
                Rating:
              </label>
              <select
                id="rating"
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                required
              >
                <option value="0" disabled>
                  Select a rating
                </option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Average</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="feedback"
                className="block text-gray-700 font-bold mb-2"
              >
                Feedback:
              </label>
              <textarea
                id="feedback"
                className="border rounded px-3 py-2 w-full h-24 focus:outline-none focus:ring focus:border-blue-300"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                htmlFor="suggestions"
                className="block text-gray-700 font-bold mb-2"
              >
                Suggestions:
              </label>
              <textarea
                id="suggestions"
                className="border rounded px-3 py-2 w-full h-24 focus:outline-none focus:ring focus:border-blue-300"
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
            {showUpdate && (
              <div className="text-green-500">
                Feedback submitted successfully!
              </div>
            )}
          </form>
        </div>
      </div>
      {showUpdate && (
        <div className="fixed bg-green-500 text-white p-4 transition-transform duration-1000 ease-in-out transform translate-y-0">
          Feature under construction!!
        </div>
      )}
    </>
  );
};
export default Feedback;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?redirect=/feedback`,
      },
    };
  }

  return {
    props: { session },
  };
}
