import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
      <h2>{project.title}</h2>
      <h3>{project.details}</h3>
      <p>{project.deadline}</p>
    </div>
  );
}
