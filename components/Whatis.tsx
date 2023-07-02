import React, { useState } from "react";
import {
  FaUsers,
  FaProjectDiagram,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";
import { motion } from "framer-motion";
import router from "next/router";

const Whatis = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const motives = [
    {
      icon: <FaUsers className="text-indigo-600 text-5xl" />,
      title: "Collaborative Community",
      description:
        "Collab@IITH is a vibrant platform where individuals and teams connect, share ideas, and collaborate on diverse projects. We believe that collaboration fuels innovation and professional growth.",
    },
    {
      icon: <FaProjectDiagram className="text-indigo-600 text-5xl" />,
      title: "Efficient Networking",
      description:
        "Discover experts and like-minded individuals from the IITH Community who can contribute to the success of your projects. Our platform facilitates efficient networking and empowers you to connect with the right people.",
    },
    {
      icon: <FaLightbulb className="text-indigo-600 text-5xl" />,
      title: "Inspire Innovation",
      description:
        "Bring your innovative ideas to life, even if you lack the technical skills. Collab@IITH enables you to assemble a team of passionate individuals who share your vision and possess the expertise to transform ideas into reality.",
    },
    {
      icon: <FaHandshake className="text-indigo-600 text-5xl" />,
      title: "Community Advancement",
      description:
        "By focusing exclusively on the IITH Community, our platform contributes to the development and growth of our collective potential. Together, we foster an environment of collaboration, sharing project credits, and nurturing a sense of collective advancement.",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleHover = (index: any) => {
    setHoveredIndex(index);
  };

  const handleHoverEnd = () => {
    setHoveredIndex(null);
  };

  const handleButtonClick = () => {
    router.push("/terms-and-conditions");
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-indigo-600 to-purple-600 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Discover Collab@IITH
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {motives.map((motive, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-300 shadow-md rounded-lg p-6 flex items-center space-x-4 cursor-pointer transition-all duration-300 hover:bg-gray-50"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => handleHover(index)}
              onHoverEnd={handleHoverEnd}
              style={{ zIndex: hoveredIndex === index ? 2 : 1 }}
            >
              <div className="flex-shrink-0">{motive.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {motive.title}
                </h3>
                <p className="text-lg text-gray-700">{motive.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-8">
          <div
            className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 cursor-pointer transition-all duration-300 hover:bg-gray-100"
            onClick={handleButtonClick}
          >
            <span className="text-lg font-semibold text-gray-800">
              View our Terms and Conditions
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800 transform transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <p className="text-lg text-white text-center mt-8">
          Join Collab@IITH today and unleash your collaborative potential.
          Connect with the diverse IITH community, inspire innovation, and
          contribute to our collective advancement.
        </p>
      </div>
    </motion.div>
  );
};

export default Whatis;
