import { SetStateAction, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import InfoIcon from "../components/Ibutton";
import Select from "react-select";

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

  const roleOptions = [
    { value: "Other", label: "Others" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Full-stack Developer", label: "Full-stack Developer" },
    { value: "Mobile App Developer", label: "Mobile App Developer" },
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Data Analyst", label: "Data Analyst" },
    { value: "Database Manager", label: "Database Manager" },
    { value: "Cybersecurity Specialist", label: "Cybersecurity Specialist" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Network Engineer", label: "Network Engineer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "AI/ML Engineer", label: "AI/ML Engineer" },
    { value: "Cloud Practitioner", label: "Cloud Practitioner" },
    { value: "Game Developer", label: "Game Developer" },
    { value: "Computer Vision Engineer", label: "Computer Vision Engineer" },
    { value: "Robotics Engineer", label: "Robotics Engineer" },
    { value: "Hardware Engineer", label: "Hardware Engineer" },
    { value: "Project Manager", label: "Project Manager" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Marketing Coordinator", label: "Marketing Coordinator" },
    { value: "Sales Representative", label: "Sales Representative" },
    { value: "Business Analyst", label: "Business Analyst" },
    { value: "Entrepreneur", label: "Entrepreneur" },
    { value: "Financial Analyst", label: "Financial Analyst" },
    { value: "Photographer", label: "Photographer" },
    { value: "Videographer", label: "Videographer" },
    { value: "Content Creator", label: "Content Creator" },
    { value: "Illustrator", label: "Illustrator" },
    { value: "Animator", label: "Animator" },
    { value: "Musician", label: "Musician" },
    { value: "Writer", label: "Writer" },
    { value: "Blogger", label: "Blogger" },
    { value: "Esports player", label: "Esports player" },
    { value: "Social Media Manager", label: "Social Media Manager" },
    { value: "Event Organizer", label: "Event Organizer" },
    { value: "Football Player", label: "Football Player" },
    { value: "Basketball Player", label: "Basketball Player" },
    { value: "Tennis Player", label: "Tennis Player" },
    { value: "Cricket Player", label: "Cricket Player" },
    { value: "Swimmer", label: "Swimmer" },
    { value: "Athlete", label: "Athlete" },
    { value: "Yoga Instructor", label: "Yoga Instructor" },
    { value: "Fitness Trainer", label: "Fitness Trainer" },
    { value: "Mentor", label: "Mentor" },
    { value: "Tutor", label: "Tutor" },
    { value: "Volunteer", label: "Volunteer" },
    { value: "Research Assistant", label: "Research Assistant" },
    { value: "Peer Counselor", label: "Peer Counselor" },
    { value: "Club President", label: "Club President" },
    { value: "Fundraiser", label: "Fundraiser" },
    { value: "Debater", label: "Debater" },
    { value: "Artist", label: "Artist" },
    { value: "Painter", label: "Painter" },
    { value: "Actor/Actress", label: "Actor/Actress" },
    { value: "Dancer", label: "Dancer" },
    { value: "Choreographer", label: "Choreographer" },
    { value: "Singer", label: "Singer" },
    { value: "Instrumentalist", label: "Instrumentalist" },
    { value: "Choir Member", label: "Choir Member" },
    { value: "Model", label: "Model" },
    { value: "Fashion Designer", label: "Fashion Designer" },
    { value: "Event Planner", label: "Event Planner" },
    { value: "Tour Guide", label: "Tour Guide" },
    { value: "Translator", label: "Translator" },
    { value: "Content Editor", label: "Content Editor" },
    { value: "Journalist", label: "Journalist" },
    { value: "Public Speaker", label: "Public Speaker" },
    { value: "Host", label: "Host" },
    { value: "Lab Assistant", label: "Lab Assistant" },
    { value: "Teaching Assistant", label: "Teaching Assistant" },
    { value: "Class Representative", label: "Class Representative" },
    { value: "Coordinator", label: "Coordinator" },
    { value: "Core", label: "Core" },
    { value: "Sports Team Captain", label: "Sports Team Captain" },
    { value: "Researcher", label: "Researcher" },
    { value: "Peer Mentor", label: "Peer Mentor" },
    { value: "Fundraiser/Producer", label: "Fundraiser/Producer" },
    { value: "Event Coordinator", label: "Event Coordinator" },
    { value: "Photography Assistant", label: "Photography Assistant" },
    { value: "Video Editor", label: "Video Editor" },
    { value: "Content Writer", label: "Content Writer" },
    { value: "Social Media Coordinator", label: "Social Media Coordinator" },
    { value: "Sports Team Player", label: "Sports Team Player" },
    { value: "Student", label: "Student" },
    { value: "Intern", label: "Intern" },
    { value: "Freelancer", label: "Freelancer" },
    { value: "Assistant", label: "Assistant" },
    { value: "Team Member", label: "Team Member" },
    { value: "Member", label: "Member" },
  ];

  const handleTypeOfPersonChange = (selectedOption: any) => {
    setTypeOfPerson(selectedOption ? selectedOption.value : "");
  };

  const handleCustomTypeChange = (e: any) => {
    setCustomType(e.target.value);
  };

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
      <h1 className="text-2xl font-bold mb-4">Create Collaboration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="title" className="font-bold flex items-center">
            Title:
            <InfoIcon message="Short and sweet titles sound better" />
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
            <InfoIcon message="Provide enough data for users to understand about the project." />
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
            Type of team member required:
          </label>
          <Select
            id="typeOfPerson"
            value={roleOptions.find((option) => option.value === typeOfPerson)}
            onChange={(selectedOption) =>
              handleTypeOfPersonChange(selectedOption)
            }
            options={roleOptions}
            className="w-full"
            placeholder="Select Type"
          />
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
              onChange={handleCustomTypeChange}
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
              <Link href={"/terms-and-conditions"} legacyBehavior>
                <a className="text-blue-500 underline">terms and conditions</a>
              </Link>{" "}
              to be followed by a creator.
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
