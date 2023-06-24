import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import ReqFavorites from "../components/requestfavorites";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = (props: { session: any }) => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  // Redirect to sign-in page if user is not authenticated
  if (!props.session) {
    router.push("/auth/signin");
    return null;
  }

  // Extract user email and name from the session object
  const {
    user: { email, name },
  } = props.session;

  // Fetch projects made by the user
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`/api/projects?userEmail=${email}`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [email]);

  // Handle sign-out
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  const userProjects = projects.filter((project: any) => project.f === email);

  return (
    <>
      <ReqFavorites />
      <div className="bg-white p-4 rounded-md shadow">
        <h1 className="text-2xl font-bold">Welcome, {name}</h1>
        <p className="text-gray-500">Email: {email}</p>

        {userProjects.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Projects by you</h2>
            <div className="flex overflow-x-auto space-x-4">
              {userProjects.map((project: any) => (
                <div
                  key={project._id}
                  className="bg-white rounded-md shadow p-4 w-64 mb-4"
                >
                  <div className="flex flex-col">
                    <h3 className="font-bold truncate text-lg">{project.a}</h3>
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
        ) : (
          <div className="mt-4">
            <p>No projects found with your name.</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => router.push("/addproject")}
            >
              Create Your First Project
            </button>
          </div>
        )}

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Profile;

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
