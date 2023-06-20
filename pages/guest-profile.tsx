import { useState, useEffect } from "react";
import FavoriteProjects from "../components/FavoriteProjects";

const availableRoles = ["Role 1", "Role 2", "Role 3", "Role 4"]; // List of available roles

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
          {availableRoles.map((role) => (
            <option key={role} value={role}>
              {role}
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
