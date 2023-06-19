import clientPromise from "../lib/mongodb";
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
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div>
      <h1>Projects from all time</h1>
      <p>
        <small>(All Projects)</small>
      </p>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h1>{project.a}</h1>
            <h2>{project.c}</h2>
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

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("projectcollaborate");

    const p = await db.collection("projects").find({}).toArray();

    return {
      props: { projects: JSON.parse(JSON.stringify(p)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { projects: [] },
    };
  }
}
