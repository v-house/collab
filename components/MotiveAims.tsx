import React from "react";

const MotivesAndAims = () => {
  const motives = [
    {
      title: "Foster Collaboration",
      description:
        "Our platform aims to foster collaboration among individuals and teams by providing a space where they can connect, share ideas, and work together on projects of mutual interest. We believe that collaboration leads to innovative solutions and professional growth.",
    },
    {
      title: "Facilitate Networking",
      description:
        "We strive to facilitate networking opportunities by connecting individuals based on their project needs. Our platform provides a network of experts and interested individuals from the IITH Community who can contribute to the success of your projects. Expand your professional network and collaborate with the right people.",
    },
    {
      title: "Promote Innovation",
      description:
        "Even if you don't possess the technical skills to build a project, our platform empowers you to bring your innovative ideas to life. Hire a team of individuals who believe in your ideas and have the necessary skills to turn them into reality. We promote innovation and encourage the sharing of project credits among contributors.",
    },
    {
      title: "Community Development",
      description:
        "By focusing exclusively on the IITH Community, our platform contributes to the development and growth of the community itself. Through collaboration and support within our community, we create an environment where everyone benefits. The end results and profits generated through projects are shared among IITH students, fostering a sense of belonging and collective advancement.",
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Our Motives and Aims
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {motives.map((motive, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-center">
                  {motive.title}
                </h3>
                <p className="text-center">{motive.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivesAndAims;
