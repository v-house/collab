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
            <h3 className="text-xl font-bold mb-4">Project Creator</h3>
            <ul className="list-disc pl-6">
              <li>Create and manage projects.</li>
              <li>Invite collaborators to your projects.</li>
              <li>Set project requirements and guidelines.</li>
              <li>Communicate with project collaborators.</li>
              <li>Review and approve project deliverables.</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Project Collaborator</h3>
            <ul className="list-disc pl-6">
              <li>Browse and apply to join projects.</li>
              <li>Collaborate with project creators and team members.</li>
              <li>Contribute to project tasks and deliverables.</li>
              <li>Communicate and coordinate with the project team.</li>
              <li>Follow project guidelines and meet deadlines.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
