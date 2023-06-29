import { getSession } from "next-auth/react";
import EmailContact from "../components/Collegeid";

const Admin = (props: { session: any }) => {
  const adminEmails = ["cs21btech11026@iith.ac.in"];

  const isAdmin = adminEmails.includes(props.session?.user?.email);

  return (
    <div>
      {isAdmin ? (
        <div className="flex items-center justify-center h-screen">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
            <img src="/favicon.ico" alt="Favicon" className="mb-4 mx-auto" />
            <h1 className="text-2xl font-bold text-center mb-8">
              Welcome, {props.session.user.name}!!
            </h1>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center h-screen">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
              <img src="/favicon.ico" alt="Favicon" className="mb-4 mx-auto" />
              <h1 className="text-2xl font-bold text-center mb-8">
                You are currently not an admin for Collab@IITH.
              </h1>
            </div>
          </div>
          <EmailContact />
        </>
      )}
    </div>
  );
};

export default Admin;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?redirect=/admin`,
      },
    };
  }

  return {
    props: { session },
  };
}
