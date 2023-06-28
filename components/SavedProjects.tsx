import React from "react";
import { useRouter } from "next/router";

const SavedProjects = (props: {
  savedProjects: any[];
  projects: any[];
  setProjects: any;
}) => {
  const router = useRouter();

  const handleViewDetails = (projectId: any) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <>
      <h2 className="text-lg font-bold mt-4">Saved Projects</h2>
      {props.savedProjects.length > 0 && (
        <div className="mt-2">
          <div className="flex overflow-x-auto space-x-4">
            {props.savedProjects.map((projectId: any) => {
              const project = props.projects.find(
                (p: { _id: any }) => p._id === projectId
              );
              if (project) {
                return (
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
                        onClick={() => handleViewDetails(project._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      )}

      {props.savedProjects.length === 0 && (
        <p className="mt-4 mb-4">
          No saved projects. You can save a project by going to the project
          details page.
        </p>
      )}
    </>
  );
};

export default SavedProjects;