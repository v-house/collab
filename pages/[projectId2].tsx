import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession, signOut, getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

interface Project {
  _id: string;
  title: string;
  details: string;
  deadline: Date;
}

export default function ProjectDetails() {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const handleLogout = async () => {
    await signOut();
    router.push("/projects");
  };

  if (status === "loading" || !project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project Details</h1>
      <h2>{project.title}</h2>
      <h3>{project.details}</h3>
      <p>{project.deadline}</p>
      <p>Username: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
