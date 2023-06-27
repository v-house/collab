import MotivesAndAims from "../components/MotiveAims";
import ServerIssueMessage from "../components/ServerIssueMessage";
import TermsAndConditions from "../components/TermsConditions";
import Whatis from "../components/Whatis";

export default function Home() {
  return (
    <>
      <Whatis />
      <MotivesAndAims />
      <TermsAndConditions />
      {/* <ServerIssueMessage /> */}
    </>
  );
}
