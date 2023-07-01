import React, { useState } from "react";
import {
  FaUsers,
  FaProjectDiagram,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";
import { motion } from "framer-motion";

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
              className="bg-white rounded-lg p-8 flex items-center"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => handleHover(index)}
              onHoverEnd={handleHoverEnd}
              style={{ zIndex: hoveredIndex === index ? 2 : 1 }}
            >
              <div className="flex-shrink-0 mr-4">{motive.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {motive.title}
                </h3>
                <p className="text-lg text-gray-700">{motive.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-lg text-white text-center mt-8">
          Join Collab@IITH today and unleash your collaborative potential.
          Connect with a diverse community, inspire innovation, and contribute
          to our collective advancement.
        </p>
      </div>
    </motion.div>
  );
};

export default Whatis;
