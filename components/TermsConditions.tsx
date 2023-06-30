import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Terms and Conditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">As a Project Creator</h3>
            <ul className="list-disc pl-6">
              <li>
                Provide accurate and truthful details when creating projects.
              </li>
              <li>
                Include sufficient and relevant information related to the
                project's objectives, requirements, and scope.
              </li>
              <li>
                Complete the entire project selection procedure before
                considering its deletion.
              </li>
              <li>
                Ensure the use of appropriate and respectful language when
                describing the project, refraining from any form of offensive,
                discriminatory, or inappropriate content.
              </li>
              <li>
                Respect and prioritize the confidentiality of any user's
                interests or personal information received during the project
                collaboration process, using such information solely for the
                purpose of the specific project.
              </li>
              <li>
                Actively engage with collaborators and respond to their
                inquiries or requests in a timely manner.
              </li>
              <li>
                Promote a collaborative and inclusive environment, fostering
                equal opportunities for all potential collaborators.
              </li>
              <li>
                Comply with any additional guidelines, policies, or legal
                requirements set forth by the platform or organization
                facilitating the project.
              </li>
              <li>
                Understand that failure to adhere to these terms and conditions
                may result in the removal of the project or other appropriate
                actions as determined by the platform or organization.
              </li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              As a Project Collaborator
            </h3>
            <ul className="list-disc pl-6">
              <li>
                Respect project timelines and adhere to agreed-upon deadlines.
              </li>
              <li>
                Communicate effectively and promptly with the project manager
                and other collaborators.
              </li>
              <li>
                Contribute actively and meaningfully to the project's objectives
                and tasks.
              </li>
              <li>
                Maintain confidentiality and protect sensitive project
                information.
              </li>
              <li>
                Seek permission and obtain proper authorization before sharing
                or distributing project-related content or materials.
              </li>
              <li>
                Collaborate in a professional and respectful manner with other
                team members.
              </li>
              <li>
                Notify the project manager in case of any anticipated delays,
                issues, or conflicts that may affect the project's progress.
              </li>
              <li>
                Follow any additional guidelines or requirements specified by
                the project manager or outlined in the project documentation.
              </li>
              <li>
                Understand that failure to meet these terms and conditions may
                result in consequences, such as being removed from the project
                or facing other disciplinary actions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
