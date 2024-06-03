import React, { useEffect, useState } from "react";
import UserUpdate from "../../components/UserUpdate/UserUpdate";
import { useAuth } from "../../components/header/navbar/AuthContext";
import { UserPage } from "./UserProfilePage.interface";
import UserEvents from "../../components/userEvents/userEvents";



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
        const response = await fetch(`https://u08-business-idea-adventurebuddies.onrender.com/api/users/${id}`, {
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
      <div className="grid rounded-lg shadow bg-textColor py-4 min-h-full w-96 mb-8">
        <UserUpdate userData={userData} setUserData={setUserData} />
        <div className="flex">
        <div className="ml-6 w-[25%]">             
            <img className="ring ring-primaryColor w-[80px] h-[80px] rounded-full"
              src={userData.profileImageUrl}
              alt="Profile"
            />
        </div>
        <div className="text-left ml-4 w-[75%]">
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
      </div>
      <div className="p-1.5">
        <UserEvents />
      </div>
    </>
  );
};

export default UserProfilePage;
