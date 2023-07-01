import { useRouter } from "next/router";
import MotivesAndAims from "../components/MotiveAims";
import ServerIssueMessage from "../components/ServerIssueMessage";
import Whatis from "../components/Whatis";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/terms-and-conditions");
  };

  return (
    <>
      <Whatis />
    </>
  );
}
