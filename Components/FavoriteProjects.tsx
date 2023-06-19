import { useEffect, useState } from "react";
import Link from "next/link";

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
}

interface ProjectsProps {
  favoriteRoles: string[];
}

function FavoriteProjects({ favoriteRoles }: ProjectsProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const projects: Project[] = data;
        console.log(projects);
        const filtered = projects.filter((project: Project) =>
          favoriteRoles.includes(project.c)
        );
        setFilteredProjects(filtered);
        console.log(filtered);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, [favoriteRoles]);

  return (
    <div>
      <h1>Projects from all time</h1>
      <p>
        <small>(Filtered Projects)</small>
      </p>
      <ul>
        {filteredProjects.map((project) => (
          <li key={project._id}>
            <h1>{project.a}</h1>
            <h2>{project._id}</h2>
            <h3>{project.f}</h3>
            <p>{project.g}</p>
            <Link href={`/projects/${project._id}`} legacyBehavior>
              <a>View Details</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteProjects;
