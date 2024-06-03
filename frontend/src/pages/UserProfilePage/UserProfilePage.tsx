import React, { useEffect, useState } from "react";
import UserUpdate from "../../components/UserUpdate/UserUpdate";
import { useAuth } from "../../components/header/navbar/AuthContext";
import { UserPage } from "./UserProfilePage.interface";



const UserProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [userData, setUserData] = useState<UserPage>({
    userName: "",
    description: "",
    profileImageUrl: "",
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) return;

    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        console.log("User ID retrieved from local storage:", id);
        console.log("Token retrieved from local storage:", token);
        if (!id || !token) {
          throw new Error("User ID or token not found");
        }

        // Fetch user data using stored userId
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("User data:", data);
        setUserData(data);
      } catch (error) {
        console.error("Fetch user data error:", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated]); // Fetch data when authentication state changes

  if (!isAuthenticated) {
    return <div>Vargod och logga in för att se din profil</div>;
  }


  return (
    <>
      <div className="grid rounded-lg shadow bg-textColor mx-4 min-h-full">
        <UserUpdate userData={userData} setUserData={setUserData} />
        <div>             
            <img className="ring ring-primaryColor"
              src={userData.profileImageUrl}
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
        </div>
        <div className="text-left ml-4">
          <h3 className="font-bold">{userData.userName}</h3>
          <p className="text-xs">{userData.description}</p>

          <div>
            <p>Mobilnummer:</p>
            <p className="text-xs">{userData.phoneNumber}</p>
          </div>
          <div>
            <p>Kön:</p>
            <p className="text-xs">{userData.gender}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
