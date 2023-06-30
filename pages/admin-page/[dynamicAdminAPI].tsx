import { createHash } from "crypto";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();
  const { randomString } = router.query;

  useEffect(() => {
    const verifySession = async () => {
      if (!randomString) {
        // Random string is missing, handle accordingly
        router.push("/profile");
        return;
      }

      // Perform your verification logic here
      const isSessionValid = await verifyRandomString(randomString);

      if (!isSessionValid) {
        // Session has expired, handle accordingly
        router.push("/profile");
        return;
      }

      // Session is valid, continue with admin page logic
      // ...
    };

    verifySession();
  }, [randomString, router]);

  const verifyRandomString = async (randomString: string | string[]) => {
    // Add your verification logic here
    // This is just an example, replace it with your own logic

    // You can extract the components from the random string using split('-')
    // and compare them with the secret code, email, and timestamp

    const secretCode = "your-secret-code";
    const email = "admin@example.com";
    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10);
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const minute = currentDate.getMinutes().toString().padStart(2, "0");
    const message = `${secretCode}-${email}-${date}-${hour}-${minute}`;
    const expectedRandomString = createHash("sha256")
      .update(message)
      .digest("hex");

    return randomString === expectedRandomString;
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {/* Add your admin page content here */}
    </div>
  );
};

export default AdminPage;
