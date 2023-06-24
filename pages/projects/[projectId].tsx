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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project Details</h1>
      <h2>{project?.a}</h2>
      <h3>{project?.b}</h3>
      <p>{project?.c}</p>

      {project?.f !== userEmail &&
        !project?.h.includes(userEmail) &&
        !project?.j.includes(userEmail) && (
          <button onClick={handleAskForCollaboration}>
            Ask for Collaboration
          </button>
        )}

      {project?.i.includes(userEmail) && (
        <div>
          <p>Your entry is pending for acceptance.</p>
        </div>
      )}

      {project?.j.includes(userEmail) && <p>You have been rejected.</p>}

      {project?.h.includes(userEmail) && (
        <div>
          <p>You are accepted. Contact the project manager: {project?.g}</p>
        </div>
      )}

      {project?.f === userEmail && (
        <div>
          <button onClick={handleDeleteProject}>Delete Project</button>
          <button onClick={() => console.log("Display accepted list")}>
            Display Accepted List
          </button>
          <button onClick={() => console.log("Display rejected list")}>
            Display Rejected List
          </button>
          <button onClick={() => console.log("Display pending list")}>
            Display Pending List
          </button>
          {project.i.map((user) => (
            <div key={user}>
              <p>{user}</p>
              <button onClick={() => handleAcceptUser(user)}>Accept</button>
              <button onClick={() => handleRejectUser(user)}>Reject</button>
            </div>
          ))}
        </div>
      )}
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
