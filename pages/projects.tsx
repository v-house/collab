import { useRouter } from "next/router";
import clientPromise from "../lib/mongodb";
import { useEffect, useState } from "react";

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
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoles, setFilteredRoles] = useState<string[]>([]);
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({});

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
  };

  const hasSearchResults = filteredRoles.length > 0;

  return (
    <>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search roles..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        {hasSearchResults ? (
          <>
            {filteredRoles.map((role) => (
              <div key={role} className="my-4">
                <h2 className="text-lg font-bold">Available for "{role}"</h2>
                <div className="flex overflow-x-auto space-x-4">
                  {projects
                    .filter((project) => project.c === role)
                    .map((project) => (
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
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No Projects Available</p>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("projectcollaborate");

    const projects = await db.collection("projects").find({}).toArray();

    return {
      props: { projects: JSON.parse(JSON.stringify(projects)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { projects: [] },
    };
  }
}
