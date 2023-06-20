import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [typeOfPerson, setTypeOfPerson] = useState("");
  const [customType, setCustomType] = useState(""); // New state for custom type
  const [expiringDate, setExpiringDate] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [expectedTraits, setExpectedTraits] = useState("");
  const [dutiesResponsibilities, setDutiesResponsibilities] = useState("");
  const [advantagesCollaboration, setAdvantagesCollaboration] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (status !== "authenticated") {
      router.push("/login"); // Redirect to the login page if not authenticated
      return;
    }

    const projectData = {
      a: title,
      b: details,
      c: typeOfPerson === "Other" ? customType : typeOfPerson, // Use customType if typeOfPerson is "Other"
      d: new Date(), // Today's date
      e: new Date(expiringDate),
      f: session?.user?.email,
      g: session?.user?.name,
      h: [], // Empty accepted list
      i: [], // Empty pending list
      j: [], // Empty rejected list
      k: externalLink,
      l: expectedTraits,
      m: dutiesResponsibilities,
      n: advantagesCollaboration,
    };

    try {
      const response = await axios.post("/api/addproject", projectData);
      console.log("Project created successfully:", response.data);

      // Reset form inputs
      setTitle("");
      setDetails("");
      setTypeOfPerson("");
      setCustomType(""); // Reset customType state
      setExpiringDate("");
      setExternalLink("");
      setExpectedTraits("");
      setDutiesResponsibilities("");
      setAdvantagesCollaboration("");

      // Redirect to the projects page
      router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="typeOfPerson">Type of Person to hire:</label>
          <select
            id="typeOfPerson"
            value={typeOfPerson}
            onChange={(e) => setTypeOfPerson(e.target.value)}
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
          <div>
            <label htmlFor="customType">Custom Type:</label>
            <input
              type="text"
              id="customType"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)} // Use setCustomType for customType state
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="expiringDate">Expiring Date:</label>
          <input
            type="date"
            id="expiringDate"
            value={expiringDate}
            onChange={(e) => setExpiringDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="externalLink">External Link:</label>
          <textarea
            id="externalLink"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expectedTraits">Expected Traits:</label>
          <textarea
            id="expectedTraits"
            value={expectedTraits}
            onChange={(e) => setExpectedTraits(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dutiesResponsibilities">
            Duties and Responsibilities:
          </label>
          <textarea
            id="dutiesResponsibilities"
            value={dutiesResponsibilities}
            onChange={(e) => setDutiesResponsibilities(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="advantagesCollaboration">
            Advantages of Collaboration:
          </label>
          <textarea
            id="advantagesCollaboration"
            value={advantagesCollaboration}
            onChange={(e) => setAdvantagesCollaboration(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
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
