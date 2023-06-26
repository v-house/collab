import { useRouter } from "next/router";
import clientPromise from "../lib/mongodb";
import { useEffect, useState } from "react";
import ReqFavorites from "../components/requestfavorites";

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
  o: number; // Available Seats
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({}: ProjectsProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoles, setFilteredRoles] = useState<string[]>([]);
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({});
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [favoriteRoles, setFavoriteRoles] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  useEffect(() => {
    const counts: Record<string, number> = {};

    projects.forEach((project) => {
      const role = project.c;
      if (counts[role]) {
        counts[role]++;
      } else {
        counts[role] = 1;
      }
    });

    setRoleCounts(counts);

    const sortedRoles = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a]
    );

    setFilteredRoles(sortedRoles);
  }, [projects]);

  useEffect(() => {
    const storedRoles = localStorage.getItem("favoriteRoles");
    if (storedRoles) {
      setFavoriteRoles(JSON.parse(storedRoles));
    }
  }, []);

  useEffect(() => {
    const filtered = projects.filter((project: Project) =>
      favoriteRoles.includes(project.c)
    );
    setFilteredProjects(filtered);
  }, [favoriteRoles]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredRoles = Object.keys(roleCounts)
      .filter((role) => role.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (
          a.toLowerCase().startsWith(query) &&
          !b.toLowerCase().startsWith(query)
        ) {
          return -1;
        }
        if (
          !a.toLowerCase().startsWith(query) &&
          b.toLowerCase().startsWith(query)
        ) {
          return 1;
        }
        return roleCounts[b] - roleCounts[a];
      });

    setFilteredRoles(filteredRoles);

    const filteredProjects = projects.filter((project) =>
      project.a.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filteredProjects);
  };

  const handleFavoritesClick = () => {
    router.push("/favorites");
  };

  const hasSearchResults = filteredRoles.length > 0;

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
      <div className="p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search among projects and roles..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        {filteredProjects.length > 0 && (
          <div className="my-4">
            <h2 className="text-lg font-bold">
              From{" "}
              <button className="text-blue-500" onClick={handleFavoritesClick}>
                "Your Favorites"
              </button>
            </h2>
            <div className="flex overflow-x-auto space-x-4">
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
                    <p className="text-gray-500">
                      Available seats: {project.o}
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
        {searchQuery !== "" && (
          <div className="mb-4">
            <h2 className="text-lg font-bold">
              Search Results from the Project Title
            </h2>
            <div className="flex overflow-x-auto space-x-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
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
                      <p className="text-gray-500">
                        Available seats: {project.o}
                      </p>
                      <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => router.push(`/projects/${project._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500 text-lg">
                    No such Projects available
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {hasSearchResults && (
          <>
            {filteredRoles.map((role) => {
              const roleProjects = projects.filter(
                (project) => project.c === role
              );
              if (roleProjects.length === 0) return null; // Skip rendering if no projects for the role
              return (
                <div key={role} className="my-4">
                  <h2 className="text-lg font-bold">Available for "{role}"</h2>
                  <div className="flex overflow-x-auto space-x-4">
                    {roleProjects.map((project) => (
                      <div
                        key={project._id}
                        className="bg-white rounded-md shadow flex-shrink-0 p-4 max-w-lg mb-4"
                      >
                        <div className="flex flex-col">
                          <h3 className="font-bold truncate">{project.a}</h3>
                          <p className="text-gray-500">
                            Expires on:{" "}
                            {new Date(project.e).toLocaleDateString()}
                          </p>
                          <p className="text-gray-500">
                            Available seats: {project.o}
                          </p>
                          <button
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() =>
                              router.push(`/projects/${project._id}`)
                            }
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <ReqFavorites />
    </>
  );
}
