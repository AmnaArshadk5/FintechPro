import { createContext, useState, useEffect } from "react";

export const UserProfileContext = createContext();

export function UserProfileProvider({ children }) {
  // Initialize state with null or data from localStorage
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error("Error parsing saved profile:", error);
      }
    }
  }, []);

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