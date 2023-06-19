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
    setSelectedRole("");
  };

  const removeRole = (role: string) => {
    setFavoriteRoles((prevRoles) =>
      prevRoles.filter((prevRole) => prevRole !== role)
    );
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>Favorite Roles</h2>
      <ul>
        {favoriteRoles.map((role) => (
          <li key={role}>
            {role}
            <button onClick={() => removeRole(role)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <select
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
        <button onClick={addRole}>Add Role</button>
      </div>

      <FavoriteProjects favoriteRoles={favoriteRoles} />
    </div>
  );
}

export default GuestProfile;
