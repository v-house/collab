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

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project Details</h1>
      <h2>{project.a}</h2>
      <h3>{project.b}</h3>
      <p>{project.c}</p>
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
