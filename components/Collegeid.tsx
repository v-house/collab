import React, { useState } from "react";
import { FiMail } from "react-icons/fi";

const EmailContact = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEmailClick = () => {
    window.location.href = "mailto:cs21btech11026@iith.ac.in";
  };

  return (
    <div
      onClick={handleEmailClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: isHovered ? "#ffffff" : "#333333",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <FiMail
        size={32}
        color={isHovered ? "#000000" : "#ffffff"}
        style={{ transition: "color 0.3s ease-in-out" }}
      />
    </div>
  );
};

export default EmailContact;
