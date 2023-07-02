import { useState, useEffect } from "react";
import FavoriteProjects from "../components/FavoriteProjects";

const availableRoles = ["Role 1", "Role 2", "Role 3", "Role 4"]; // List of available roles

const roleOptions = [
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "Full-stack Developer", label: "Full-stack Developer" },
  { value: "Mobile App Developer", label: "Mobile App Developer" },
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Data Analyst", label: "Data Analyst" },
  { value: "Database Manager", label: "Database Manager" },
  { value: "Cybersecurity Specialist", label: "Cybersecurity Specialist" },
  { value: "UI/UX Designer", label: "UI/UX Designer" },
  { value: "Graphic Designer", label: "Graphic Designer" },
  { value: "Network Engineer", label: "Network Engineer" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "AI/ML Engineer", label: "AI/ML Engineer" },
  { value: "Cloud Practitioner", label: "Cloud Practitioner" },
  { value: "Game Developer", label: "Game Developer" },
  { value: "Computer Vision Engineer", label: "Computer Vision Engineer" },
  { value: "Robotics Engineer", label: "Robotics Engineer" },
  { value: "Hardware Engineer", label: "Hardware Engineer" },
  { value: "Project Manager", label: "Project Manager" },
  { value: "Product Manager", label: "Product Manager" },
  { value: "Marketing Coordinator", label: "Marketing Coordinator" },
  { value: "Sales Representative", label: "Sales Representative" },
  { value: "Business Analyst", label: "Business Analyst" },
  { value: "Entrepreneur", label: "Entrepreneur" },
  { value: "Financial Analyst", label: "Financial Analyst" },
  { value: "Photographer", label: "Photographer" },
  { value: "Videographer", label: "Videographer" },
  { value: "Content Creator", label: "Content Creator" },
  { value: "Illustrator", label: "Illustrator" },
  { value: "Animator", label: "Animator" },
  { value: "Musician", label: "Musician" },
  { value: "Writer", label: "Writer" },
  { value: "Blogger", label: "Blogger" },
  { value: "Esports player", label: "Esports player" },
  { value: "Social Media Manager", label: "Social Media Manager" },
  { value: "Event Organizer", label: "Event Organizer" },
  { value: "Football Player", label: "Football Player" },
  { value: "Basketball Player", label: "Basketball Player" },
  { value: "Tennis Player", label: "Tennis Player" },
  { value: "Cricket Player", label: "Cricket Player" },
  { value: "Swimmer", label: "Swimmer" },
  { value: "Athlete", label: "Athlete" },
  { value: "Yoga Instructor", label: "Yoga Instructor" },
  { value: "Fitness Trainer", label: "Fitness Trainer" },
  { value: "Mentor", label: "Mentor" },
  { value: "Tutor", label: "Tutor" },
  { value: "Volunteer", label: "Volunteer" },
  { value: "Research Assistant", label: "Research Assistant" },
  { value: "Peer Counselor", label: "Peer Counselor" },
  { value: "Club President", label: "Club President" },
  { value: "Fundraiser", label: "Fundraiser" },
  { value: "Debater", label: "Debater" },
  { value: "Artist", label: "Artist" },
  { value: "Painter", label: "Painter" },
  { value: "Actor/Actress", label: "Actor/Actress" },
  { value: "Dancer", label: "Dancer" },
  { value: "Choreographer", label: "Choreographer" },
  { value: "Singer", label: "Singer" },
  { value: "Instrumentalist", label: "Instrumentalist" },
  { value: "Choir Member", label: "Choir Member" },
  { value: "Model", label: "Model" },
  { value: "Fashion Designer", label: "Fashion Designer" },
  { value: "Event Planner", label: "Event Planner" },
  { value: "Tour Guide", label: "Tour Guide" },
  { value: "Translator", label: "Translator" },
  { value: "Content Editor", label: "Content Editor" },
  { value: "Journalist", label: "Journalist" },
  { value: "Public Speaker", label: "Public Speaker" },
  { value: "Host", label: "Host" },
  { value: "Lab Assistant", label: "Lab Assistant" },
  { value: "Teaching Assistant", label: "Teaching Assistant" },
  { value: "Class Representative", label: "Class Representative" },
  { value: "Coordinator", label: "Coordinator" },
  { value: "Core", label: "Core" },
  { value: "Sports Team Captain", label: "Sports Team Captain" },
  { value: "Researcher", label: "Researcher" },
  { value: "Peer Mentor", label: "Peer Mentor" },
  { value: "Fundraiser/Producer", label: "Fundraiser/Producer" },
  { value: "Event Coordinator", label: "Event Coordinator" },
  { value: "Photography Assistant", label: "Photography Assistant" },
  { value: "Video Editor", label: "Video Editor" },
  { value: "Content Writer", label: "Content Writer" },
  { value: "Social Media Coordinator", label: "Social Media Coordinator" },
  { value: "Sports Team Player", label: "Sports Team Player" },
  { value: "Student", label: "Student" },
  { value: "Intern", label: "Intern" },
  { value: "Freelancer", label: "Freelancer" },
  { value: "Assistant", label: "Assistant" },
  { value: "Team Member", label: "Team Member" },
  { value: "Member", label: "Member" },
];

function GuestProfile() {
  const [favoriteRoles, setFavoriteRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const storedRoles = localStorage.getItem("favoriteRoles");
    if (storedRoles) {
      setFavoriteRoles(JSON.parse(storedRoles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteRoles", JSON.stringify(favoriteRoles));
  }, [favoriteRoles]);

  const addRole = () => {
    if (selectedRole.trim() !== "" && !favoriteRoles.includes(selectedRole)) {
      setFavoriteRoles((prevRoles) => [...prevRoles, selectedRole]);
      setSelectedRole("");
    }
  };

  const removeRole = (role: string) => {
    setFavoriteRoles((prevRoles) =>
      prevRoles.filter((prevRole) => prevRole !== role)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <h2 className="text-lg font-bold mb-2">Favorite Roles</h2>
      <ul className="space-y-2">
        {favoriteRoles.map((role) => (
          <li
            key={role}
            className="flex items-center justify-between bg-white rounded-md shadow-md py-2 px-4"
          >
            <span>{role}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeRole(role)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2 mt-4">
        <select
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select a role</option>
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          onClick={addRole}
        >
          Add Role
        </button>
      </div>

      <FavoriteProjects favoriteRoles={favoriteRoles} />
    </div>
  );
}

export default GuestProfile;
