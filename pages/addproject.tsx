import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [typeOfPerson, setTypeOfPerson] = useState("");
  const [customType, setCustomType] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [expectedTraits, setExpectedTraits] = useState("");
  const [dutiesResponsibilities, setDutiesResponsibilities] = useState("");
  const [advantagesCollaboration, setAdvantagesCollaboration] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(expiringDate);

    if (selectedDate > today && selectedDate <= addDays(today, 30)) {
      const projectData = {
        a: title,
        b: details,
        c: typeOfPerson === "Other" ? customType : typeOfPerson,
        d: today,
        e: selectedDate,
        f: session?.user?.email,
        g: session?.user?.name,
        h: [],
        i: [],
        j: [],
        k: externalLink,
        l: expectedTraits,
        m: dutiesResponsibilities,
        n: advantagesCollaboration,
        o: availableSeats,
      };

      try {
        const response = await axios.post("/api/addproject", projectData);
        console.log("Project created successfully:", response.data);

        setTitle("");
        setDetails("");
        setTypeOfPerson("");
        setCustomType("");
        setExpiringDate("");
        setExternalLink("");
        setExpectedTraits("");
        setDutiesResponsibilities("");
        setAdvantagesCollaboration("");

        router.push("/projects");
      } catch (error) {
        console.error("Error creating project:", error);
      }
    } else {
      console.error("Invalid expiry date");
    }
  };

  const addDays = (date: string | number | Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="details" className="block font-bold mb-1">
            Details:
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="typeOfPerson" className="block font-bold mb-1">
            Type of Person to hire:
          </label>
          <select
            id="typeOfPerson"
            value={typeOfPerson}
            onChange={(e) => setTypeOfPerson(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Role 1">Role 1</option>
            <option value="Role 2">Role 2</option>
            <option value="Role 3">Role 3</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {typeOfPerson === "Other" && (
          <div className="mt-4">
            <label htmlFor="customType" className="block font-bold mb-1">
              Custom Type:
            </label>
            <input
              type="text"
              id="customType"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}

        <div className="mt-4">
          <label htmlFor="availableSeats" className="block font-bold mb-1">
            Available Seats:
          </label>
          <input
            type="number"
            id="availableSeats"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="expiringDate" className="block font-bold mb-1">
            Expiring Date:
          </label>
          <input
            type="date"
            id="expiringDate"
            value={expiringDate}
            onChange={(e) => setExpiringDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            max={addDays(new Date(), 30).toISOString().split("T")[0]}
            required
          />
        </div>
        <div>
          <label htmlFor="externalLink" className="block font-bold mb-1">
            External Link:
          </label>
          <textarea
            id="externalLink"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="expectedTraits" className="block font-bold mb-1">
            Expected Traits:
          </label>
          <textarea
            id="expectedTraits"
            value={expectedTraits}
            onChange={(e) => setExpectedTraits(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="dutiesResponsibilities"
            className="block font-bold mb-1"
          >
            Duties and Responsibilities:
          </label>
          <textarea
            id="dutiesResponsibilities"
            value={dutiesResponsibilities}
            onChange={(e) => setDutiesResponsibilities(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="advantagesCollaboration"
            className="block font-bold mb-1"
          >
            Advantages of Collaboration:
          </label>
          <textarea
            id="advantagesCollaboration"
            value={advantagesCollaboration}
            onChange={(e) => setAdvantagesCollaboration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }
  return {
    props: { session },
  };
}
