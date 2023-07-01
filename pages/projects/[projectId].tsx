import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import Loading from "../../components/Loading";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

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
  p: string; // Pending user's link
  q: string; // Accepted user's link
  r: string; // Rejected user's link
}

export default function ProjectDetails() {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState<Project>({
    // Initialize with an empty object
    _id: "",
    a: "",
    b: "",
    c: "",
    d: new Date(),
    e: new Date(),
    f: "",
    g: "",
    h: [],
    i: [],
    j: [],
    k: "",
    l: "",
    m: "",
    n: "",
    o: 0,
    p: "",
    q: "",
    r: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const [projectNotFound, setProjectNotFound] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `/api/protected-hashed-nextjs/${projectId}`
        );
        setProject(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setProjectNotFound(true);
        setIsLoading(false);
      }
    };

    const fetchUserEmail = async () => {
      const session = await getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };

    const fetchSavedProjects = () => {
      const savedProjectsStr = localStorage.getItem("savedProjects");
      if (savedProjectsStr) {
        const savedProjectsArr = JSON.parse(savedProjectsStr) as string[];
        setSavedProjects(savedProjectsArr);
      }
    };

    if (projectId) {
      fetchProjectDetails();
      fetchUserEmail();
      fetchSavedProjects();
    }
  }, [projectId]);

  const handleSaveProject = (projectId: string) => {
    if (projectId && !savedProjects.includes(projectId)) {
      const updatedSavedProjects = [...savedProjects, projectId];
      setSavedProjects(updatedSavedProjects);
      localStorage.setItem(
        "savedProjects",
        JSON.stringify(updatedSavedProjects)
      );
    } else {
      const updatedSavedProjects = savedProjects.filter(
        (id) => id !== projectId
      );
      setSavedProjects(updatedSavedProjects);
      localStorage.setItem(
        "savedProjects",
        JSON.stringify(updatedSavedProjects)
      );
    }
  };

  const handleAskForCollaboration = async () => {
    if (
      confirm(
        `Please confirm your request. Make sure you have met all the needs and requirements. Hence, confirm this because this action is irreversible?`
      )
    ) {
      try {
        await axios.post(`/api/projects/${projectId}/askForCollaboration`, {
          userEmail,
        });
        alert("Request for collaboration sent");
        // Refresh the project details
        const response = await axios.get(
          `/api/protected-hashed-nextjs/${projectId}`
        );
        setProject(response.data);
      } catch (error) {
        alert("Error asking for collaboration");
      }
    }
  };

  const handleAcceptUser = async (userEmail: string) => {
    if (
      confirm(
        `You are accepting the user with the following email-id: ${userEmail}. Are you sure because this action is irreversible?`
      )
    ) {
      try {
        await axios.post(`/api/projects/${projectId}/acceptUser`, {
          userEmail,
        });
        alert("User accepted");
        // Refresh the project details
        const response = await axios.get(
          `/api/protected-hashed-nextjs/${projectId}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error accepting user:", error);
        alert("Error accepting user");
      }
    }
  };

  const handleRejectUser = async (userEmail: string) => {
    if (
      confirm(
        `You are rejecting the user with the following email-id: ${userEmail}. Are you sure because this action is irreversible?`
      )
    ) {
      try {
        await axios.post(`/api/projects/${projectId}/rejectUser`, {
          userEmail,
        });
        alert("User rejected");
        // Refresh the project details
        const response = await axios.get(
          `/api/protected-hashed-nextjs/${projectId}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error rejecting user:", error);
        alert("Error rejecting user");
      }
    }
  };

  const handleDeleteProject = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`/api/projects/${projectId}/deleteProject`);
        alert("Project deleted");
        router.push("/profile");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project");
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (projectNotFound) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
          <img src="/favicon.ico" alt="Favicon" className="mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-center mb-8">
            The project could have been deleted or temporarily erased.
          </h1>
        </div>
      </div>
    );
  }

  const handleCopyEmail = (email: string) => {
    if (email) {
      navigator.clipboard.writeText(email);
      // Add any additional logic or feedback you want to provide after copying the email
      console.log(`Email ${email} copied to clipboard.`);
    }
  };

  const handleCopyAllEmails = (emails: string) => {
    navigator.clipboard.writeText(emails);
  };

  return (
    <>
      <div>
        <div className="container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Project Details</h1>
              <button
                onClick={() => handleSaveProject(project?._id)}
                className="bg-transparent text-gray-800 hover:text-gray-600 p-1 rounded-full"
              >
                {savedProjects.includes(project?._id) ? (
                  <AiFillHeart size={24} />
                ) : (
                  <AiOutlineHeart size={24} />
                )}
              </button>
            </div>
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
                <p>
                  {project?.d
                    ? new Date(project?.d).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Date-Time of Expiration:</h2>
                <p>
                  {project?.e
                    ? new Date(project?.e).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
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
                  Link
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
                <h2 className="text-lg font-bold">Required skills:</h2>
                <p>{project?.l}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Duties:</h2>
                <p>{project?.m}</p>
              </div>

              {project?.n && (
                <>
                  <div>
                    <h2 className="text-lg font-bold">Advantages:</h2>
                    <p>{project?.n}</p>
                  </div>
                </>
              )}

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
              !project?.h?.includes(userEmail) &&
              !project?.j?.includes(userEmail) &&
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
                  Entry taking time has expired.
                </p>
              ))}

            {project?.i?.includes(userEmail) && (
              <>
                <div className="mt-4">
                  <p className="text-yellow-500">
                    Your entry is pending for acceptance.
                  </p>
                </div>
                <div className="mt-4">
                  {project.p && (
                    <p className="text-blue-500">
                      <a
                        href={project.p}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link for pending users
                      </a>
                    </p>
                  )}
                </div>
              </>
            )}

            {project?.j?.includes(userEmail) && (
              <>
                <p className="mt-4 text-red-500">You have been rejected.</p>
                <div className="mt-4">
                  {project.r && (
                    <p className="text-blue-500">
                      <a
                        href={project.r}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link for rejected users
                      </a>
                    </p>
                  )}
                </div>
              </>
            )}

            {project?.h?.includes(userEmail) && (
              <>
                <div className="mt-4">
                  <p className="text-green-500">
                    You are accepted. Contact the project manager: {project?.g}
                  </p>
                </div>
                <div className="mt-4">
                  {project.q && (
                    <p className="text-blue-500">
                      <a
                        href={project.q}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link for accepted users
                      </a>
                    </p>
                  )}
                </div>
              </>
            )}

            {project?.f === userEmail && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded shadow-md p-4">
                    <h2 className="text-lg font-bold mt-4">
                      Accepted users list ({project?.h?.length ?? 0}):
                    </h2>
                    <div className="mt-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() =>
                          handleCopyAllEmails(project.h.join("\n"))
                        }
                      >
                        Copy Accepted Email list
                      </button>
                    </div>
                    {project.h.map((user) => (
                      <div key={user} className="flex items-center">
                        <p>{user}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border rounded shadow-md p-4">
                    <h2 className="text-lg font-bold mt-4">
                      Rejected users list ({project?.j?.length ?? 0}):
                    </h2>
                    <div className="mt-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() =>
                          handleCopyAllEmails(project.j.join("\n"))
                        }
                      >
                        Copy Rejected Email list
                      </button>
                    </div>
                    {project.j.map((user) => (
                      <div key={user} className="flex items-center">
                        <p>{user}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border rounded shadow-md p-4">
                    <h2 className="text-lg font-bold mt-4">
                      Pending users list ({project?.i?.length ?? 0}):
                    </h2>
                    <div className="mt-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() =>
                          handleCopyAllEmails(project.i.join("\n"))
                        }
                      >
                        Copy Pending Email list
                      </button>
                    </div>
                    {project.i.map((user) => (
                      <div key={user} className="flex flex-col items-start">
                        <p>{user}</p>
                        <div className="mt-2">
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-1 mb-1"
                            onClick={() => handleAcceptUser(user)}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-1 mb-1"
                            onClick={() => handleRejectUser(user)}
                          >
                            Reject
                          </button>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1 mb-1"
                            onClick={() => handleCopyEmail(user)}
                          >
                            Copy Email
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDeleteProject}
                  >
                    Delete Project
                  </button>
                </div>
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
  const { projectId } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?redirect=/projects/${projectId}`,
      },
    };
  }
  return {
    props: { session },
  };
}
