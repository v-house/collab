import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import ReqFavorites from "../components/requestfavorites";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = (props: { session: any }) => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(100);
  const dialogTimeout = 5000; // Dialog box timeout in milliseconds

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

  // Show the dialog for the specified timeout
  useEffect(() => {
    if (showDialog) {
      const timer = setTimeout(() => {
        setShowDialog(false);
      }, dialogTimeout);

      // Update the loader progress every 100ms
      const increment = (dialogTimeout / 100) * 100;
      const progressInterval = setInterval(() => {
        setLoaderProgress((prevProgress) =>
          Math.max(prevProgress - increment, 0)
        );
      }, 100);

      // Clear the timer and progress interval when dialog is closed
      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [showDialog]);

  // Open the dialog
  const openDialog = () => {
    setShowDialog(true);
    setLoaderProgress(100);
  };

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

        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
              <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                  style={{
                    width: `${loaderProgress}%`,
                    borderRadius: "inherit",
                    transition: `width ${dialogTimeout}ms linear`,
                  }}
                ></div>
              </div>
              <h2 className="text-xl font-bold mb-4">A Message for You</h2>
              <p className="text-lg">
                And so are we happy for you! Come on! Let's go ahead and join
                our hands to come together and collaborate.
              </p>
              <p className="text-sm mt-4 text-red-500">
                <em>
                  ***Note: The message for you keeps updating, so please come
                  back here when you get back at collab@IITH
                </em>
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300"
            onClick={openDialog}
          >
            I'm happy today
          </button>
          <button
            className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-yellow-500 hover:to-red-500 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
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
