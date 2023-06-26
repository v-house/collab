import React from "react";

const MotivesAndAims = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Our Motives and Aims
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Foster Collaboration</h3>
            <p>
              Our website aims to foster collaboration among individuals and
              teams by providing a platform where they can connect, share ideas,
              and work together on projects of mutual interest.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Facilitate Networking</h3>
            <p>
              We strive to facilitate networking opportunities by bringing
              together like-minded individuals, enabling them to expand their
              professional network, form meaningful connections, and discover
              new collaboration possibilities.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Promote Innovation</h3>
            <p>
              Our platform encourages innovation by providing a space where
              creative individuals can find project partners, exchange unique
              ideas, and collaborate on innovative projects that push the
              boundaries of knowledge and technology.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Empower Entrepreneurs</h3>
            <p>
              We empower entrepreneurs by connecting them with talented
              professionals, mentors, and resources, enabling them to turn their
              ideas into successful ventures and contribute to the growth of the
              entrepreneurial ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivesAndAims;
