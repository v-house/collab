import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import ReqFavorites from "../components/requestfavorites";

const Profile = (props: { session: any }) => {
  const router = useRouter();

  // Redirect to sign-in page if user is not authenticated
  if (!props.session) {
    router.push("/auth/signin");
    return null;
  }

  // Extract user email and name from the session object
  const {
    user: { email, name },
  } = props.session;

  // Handle sign-out
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  return (
    <>
      <ReqFavorites />
      <div>
        <p>Profile page</p>
        <h1>Welcome, {name}</h1>
        <p>Email: {email}</p>
        <button onClick={handleSignOut}>Sign Out</button>
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
