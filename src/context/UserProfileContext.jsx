import { useState } from "react";
import { UserProfileContext } from "./UserProfileContextValue";

export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (!savedProfile) {
      return null;
    }

    try {
      return JSON.parse(savedProfile);
    } catch (error) {
      console.error("Error parsing saved profile:", error);
      return null;
    }
  });

  const updateProfile = (data) => {
    setProfile(data);
    localStorage.setItem("userProfile", JSON.stringify(data));
  };

  const clearProfile = () => {
    setProfile(null);
    localStorage.removeItem("userProfile");
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}
