import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/profile" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Sign In with Google
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Why we require Sign in</h2>
          <ul className="list-disc list-inside">
            <li>Condition 1</li>
            <li>Condition 2</li>
            <li>Condition 3</li>
            {/* Add more conditions here */}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            What we take from your Google account
          </h2>
          <ul className="list-disc list-inside">
            <li>Access point 1</li>
            <li>Access point 2</li>
            <li>Access point 3</li>
            {/* Add more access points here */}
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
