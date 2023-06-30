import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const call = router.query.redirect || "/";

  const handleSignIn = () => {
    signIn("google", { callbackUrl: String(call) });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Sign In with Google
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Why Sign In is Required
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Access to most of the website's features is limited to the IITH
              community only.
            </li>
            <li>
              Projects may contain personal content that can only be shared with
              authorized individuals.
            </li>
            <li>
              Authentication is necessary to obtain your details for
              collaboration purposes.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Information We Collect from Your Google Account
          </h2>
          <ul className="list-disc list-inside">
            <li>
              We collect your name, email, and profile image for generating
              session tokens.
            </li>
          </ul>
        </div>

        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600 transition-colors duration-300 w-full"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
