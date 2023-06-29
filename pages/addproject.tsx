import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import InfoIcon from "../components/Ibutton";

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
  const [pendingLink, setPendingLink] = useState("");
  const [acceptedLink, setAcceptedLink] = useState("");
  const [rejectedLink, setRejectedLink] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [formError, setFormError] = useState(false);

  const MAX_TITLE_LENGTH = 50;
  const MAX_DETAILS_LENGTH_1 = 400;
  const MAX_DETAILS_LENGTH_2 = 600;

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (status !== "authenticated") {
      router.push("/auth/signin");
      return;
    }

    if (!termsChecked) {
      setFormError(true);
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
        p: pendingLink,
        q: acceptedLink,
        r: rejectedLink,
      };

      try {
        const response = await axios.post("/api/cproject", projectData);
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
      alert("Invalid expiry date");
    }
  };

  const addDays = (date: string | number | Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="title" className="font-bold flex items-center">
            Title:
            <InfoIcon message="Short and sweet titles are better" />
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            maxLength={MAX_TITLE_LENGTH}
            required
          />
          <p className="text-gray-500 text-sm mt-1">
            {title.length}/{MAX_TITLE_LENGTH} characters
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="details" className="font-bold flex items-center">
            Details:
            <InfoIcon message="We respect your privacy, but provide atleast some details for the users to understand and show interest in your project." />
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={MAX_DETAILS_LENGTH_2}
            required
          />
          <p className="text-gray-500 text-sm mt-1">
            {details.length}/{MAX_DETAILS_LENGTH_2} characters
          </p>
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
              maxLength={MAX_TITLE_LENGTH}
              required
            />
            <p className="text-gray-500 text-sm mt-1">
              {customType.length}/{MAX_TITLE_LENGTH} characters
            </p>
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
            max={1000}
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="expiringDate" className="font-bold flex items-center">
            Expiring Date:
            <InfoIcon message="No longer responses shall be taken after this time." />
          </label>
          <input
            type="datetime-local"
            id="expiringDate"
            value={expiringDate}
            onChange={(e) => setExpiringDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            min={addDays(new Date(), 1).toISOString().slice(0, -8)}
            max={addDays(new Date(), 30).toISOString().slice(0, -8)}
            required
          />

          <p className="text-gray-500 text-sm mt-1">
            Can be chosen between tomorrow and 30 days from today.
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="externalLink" className="font-bold flex items-center">
            External Link:
            <InfoIcon message="Link for everyone." />
          </label>
          <textarea
            id="externalLink"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={200}
            required
          />
          <p className="text-gray-500 text-sm mt-1">Enter a valid link.</p>
        </div>

        <div className="mt-4">
          <label htmlFor="expectedTraits" className="block font-bold mb-1">
            Required skills:
          </label>
          <textarea
            id="expectedTraits"
            value={expectedTraits}
            onChange={(e) => setExpectedTraits(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={MAX_DETAILS_LENGTH_1}
            required
          />
          <p className="text-gray-500 text-sm mt-1">
            {expectedTraits.length}/{MAX_DETAILS_LENGTH_1} characters
          </p>
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
            maxLength={MAX_DETAILS_LENGTH_1}
            required
          />
          <p className="text-gray-500 text-sm mt-1">
            {dutiesResponsibilities.length}/{MAX_DETAILS_LENGTH_1} characters
          </p>
        </div>

        <div className="mt-4">
          <label
            htmlFor="advantagesCollaboration"
            className="font-bold flex items-center"
          >
            Advantages of Collaboration (optional):
          </label>
          <textarea
            id="advantagesCollaboration"
            value={advantagesCollaboration}
            onChange={(e) => setAdvantagesCollaboration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={MAX_DETAILS_LENGTH_1}
          />
          <p className="text-gray-500 text-sm mt-1">
            {advantagesCollaboration.length}/{MAX_DETAILS_LENGTH_1} characters
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="pendingLink" className="block font-bold mb-1">
            Link for pending users only (optional):
          </label>
          <textarea
            id="pendingLink"
            value={pendingLink}
            onChange={(e) => setPendingLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={200}
          />
          <p className="text-gray-500 text-sm mt-1">Enter a valid link.</p>
        </div>

        <div className="mt-4">
          <label htmlFor="acceptedLink" className="block font-bold mb-1">
            Link for accepted users only (optional):
          </label>
          <textarea
            id="acceptedLink"
            value={acceptedLink}
            onChange={(e) => setAcceptedLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={200}
          />
          <p className="text-gray-500 text-sm mt-1">Enter a valid link.</p>
        </div>

        <div className="mt-4">
          <label htmlFor="rejectedLink" className="block font-bold mb-1">
            Link for rejected users only (optional):
          </label>
          <textarea
            id="rejectedLink"
            value={rejectedLink}
            onChange={(e) => setRejectedLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={200}
          />
          <p className="text-gray-500 text-sm mt-1">Enter a valid link.</p>
        </div>

        <div className="mt-4">
          <label htmlFor="terms" className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsChecked}
              onChange={(e) => {
                setTermsChecked(e.target.checked);
                setFormError(false);
              }}
              className="mr-2"
            />
            <span>
              I have read and agree to the{" "}
              <Link href={"/"} legacyBehavior>
                <a className="text-blue-500 underline">terms and conditions</a>
              </Link>{" "}
              to be followed by a project manager.
            </span>
          </label>

          {formError && (
            <p className="text-red-500 text-sm mt-1">
              Please agree to the <a>terms and conditions</a>.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
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
        destination: `/auth/signin?redirect=/addproject`,
      },
    };
  }
  return {
    props: { session },
  };
}
