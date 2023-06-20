import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";

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
    <>
      {filteredProjects.length > 0 && (
        <div className="my-4 mx-2">
          <h2 className="text-lg font-bold">From your Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-md shadow flex-shrink-0 p-4 max-w-lg mb-4"
              >
                <div className="flex flex-col">
                  <h3 className="font-bold truncate">{project.a}</h3>
                  <p className="text-gray-500">
                    <b>Role: </b>
                    {project.c}
                  </p>
                  <p className="text-gray-500">
                    Expires on: {new Date(project.e).toLocaleDateString()}
                  </p>
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => router.push(`/projects/${project._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FavoriteProjects;
