import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";

interface Project {
  _id: string;
  a: string; // Project Title
  b: string; // Project Details
  c: string; // Type of Person to hire
  d: Date; // Date of creation
  e: Date; // Date of expiring
  f: string; // Project Manager Id
  g: string; // Project Manager Name
  h: string[]; // Accepted List
  i: string[]; // Pending List
  j: string[]; // Rejected List
  k: string; // External Link
  l: string; // Expected traits
  m: string; // Duties and Responsibilities
  n: string; // Advantages of Collaboration
  o: number; // Available seats
}

export default function ProjectDetails() {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}`);
        setProject(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    const fetchUserEmail = async () => {
      const session = await getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };

    if (projectId) {
      fetchProjectDetails();
      fetchUserEmail();
    }
  }, [projectId]);

  const handleAskForCollaboration = async () => {
    try {
      await axios.post(`/api/projects/${projectId}/askForCollaboration`, {
        userEmail,
      });
      alert("Request for collaboration sent");
      // Refresh the project details
      const response = await axios.get(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error asking for collaboration:", error);
      alert("Error asking for collaboration");
    }
  };

  const handleAcceptUser = async (userEmail: string) => {
    try {
      await axios.post(`/api/projects/${projectId}/acceptUser`, { userEmail });
      alert("User accepted");
      // Refresh the project details
      const response = await axios.get(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error accepting user:", error);
      alert("Error accepting user");
    }
  };

  const handleRejectUser = async (userEmail: string) => {
    try {
      await axios.post(`/api/projects/${projectId}/rejectUser`, { userEmail });
      alert("User rejected");
      // Refresh the project details
      const response = await axios.get(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error rejecting user:", error);
      alert("Error rejecting user");
    }
  };

  const handleDeleteProject = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`/api/projects/${projectId}/deleteProject`);
        alert("Project deleted");
        router.push("/projects");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project");
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="container mx-auto p-4">
          <div className="container mx-auto p-4">
            <div>Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Project Details</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-bold">Project Title:</h2>
                <p>{project?.a}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Project Details:</h2>
                <p>{project?.b}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Available Role:</h2>
                <p>{project?.c}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Date-Time of Creation:</h2>
                <p>{project?.d ? new Date(project?.d).toLocaleString() : ""}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Date-Time of Expiration:</h2>
                <p>{project?.e ? new Date(project?.e).toLocaleString() : ""}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Project Manager Name:</h2>
                <p>{project?.g}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Project Manager Email:</h2>
                <p>
                  <a
                    href={`mailto:${project?.g}`}
                    className="text-blue-500 hover:text-blue-300"
                  >
                    {project?.f}
                  </a>
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold">External Link:</h2>
                <a
                  href={project?.k}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {project?.k}
                </a>
                <button
                  onClick={() => {
                    if (project?.k) {
                      navigator.clipboard.writeText(project.k);
                      setCopyButtonText("Copied!");

                      setTimeout(() => {
                        setCopyButtonText("Copy Link");
                      }, 3000);
                    }
                  }}
                  className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                >
                  {copyButtonText}
                </button>
              </div>

              <div>
                <h2 className="text-lg font-bold">Traits Mentioned:</h2>
                <p>{project?.l}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Duties:</h2>
                <p>{project?.m}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Advantages:</h2>
                <p>{project?.n}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Seats Available:</h2>
                <p>{project?.o}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">People Interacted:</h2>
                <p>
                  {(project?.h?.length ?? 0) +
                    (project?.i?.length ?? 0) +
                    (project?.j?.length ?? 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold">Project Updates</h1>

            {project?.f !== userEmail &&
              !project?.h.includes(userEmail) &&
              !project?.j.includes(userEmail) &&
              (project?.e && new Date() <= new Date(project?.e) ? (
                <div className="mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAskForCollaboration}
                  >
                    Ask for Collaboration
                  </button>
                </div>
              ) : (
                <p className="mt-4 text-red-500">
                  Entry taking time has expired
                </p>
              ))}

            {project?.i.includes(userEmail) && (
              <div className="mt-4">
                <p className="text-yellow-500">
                  Your entry is pending for acceptance.
                </p>
              </div>
            )}

            {project?.j.includes(userEmail) && (
              <p className="mt-4 text-red-500">You have been rejected.</p>
            )}

            {project?.h.includes(userEmail) && (
              <div className="mt-4">
                <p className="text-green-500">
                  You are accepted. Contact the project manager: {project?.g}
                </p>
              </div>
            )}

            {project?.f === userEmail && (
              <div className="mt-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteProject}
                >
                  Delete Project
                </button>
                <h2 className="text-lg font-bold mt-4">Accepted users list:</h2>
                {project.h.map((user) => (
                  <div key={user}>
                    <p>{user}</p>
                  </div>
                ))}
                <h2 className="text-lg font-bold mt-4">Rejected users list:</h2>
                {project.j.map((user) => (
                  <div key={user}>
                    <p>{user}</p>
                  </div>
                ))}
                <h2 className="text-lg font-bold mt-4">Pending users list:</h2>
                {project.i.map((user) => (
                  <div key={user}>
                    <p>{user}</p>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleAcceptUser(user)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleRejectUser(user)}
                    >
                      Reject
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
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
