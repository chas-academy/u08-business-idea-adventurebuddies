import React, { useEffect, useState } from "react";
import UserUpdate from "../../components/UserUpdate/UserUpdate";
import { UserPage } from "./UserProfilePage.interface";
import UserEvents from "../../components/userEvents/userEvents";
import FriendsList from "../../components/FriendsList/FriendsList";

const UserProfilePage: React.FC = () => {
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

    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if (!id || !token) {
          throw new Error("User ID or token not found");
        }

        // Fetch user data using stored userId
        const response = await fetch(
          `https://u08-business-idea-adventurebuddies.onrender.com/api/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Fetch user data error:", error);
      }
    };

    fetchUserData();
  }, []); // Fetch data when authentication state changes

  return (
    <>
      <div className="grid rounded-lg shadow-2xl bg-textColor py-4 min-h-full w-96 mb-8 xl:w-[600px]">
        <UserUpdate userData={userData} setUserData={setUserData} />
        <div className="flex">
          <div className="ml-6 w-[30%] xl: w-[25%]">
            <img
              className="ring ring-primaryColor w-[80px] h-[80px] rounded-full xl:w-[100px] xl:h-[100px]"
              src={userData.profileImageUrl}
              alt="Profile"
            />
          </div>
          <div className="text-left ml-4 w-[70%] xl:w-[75%]">
            <h3 className="font-bold xl:text-xl">{userData.userName}</h3>
            <p className="text-xs xl:text-sm">{userData.description}</p>

            <div className="xl:flex xl:mt-4">
              <div className="w-1/2">
                <p>Mobilnummer:</p>
                <p className="text-xs xl:text-lg">{userData.phoneNumber}</p>
              </div>
              <div className="w-1/2">
                {/* <p>Kön:</p>
            <p className="text-xs xl:text-lg">{userData.gender}</p> */}
                <p>Email:</p>
                <p className="text-xs xl:text-lg">{userData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-1.5">
        <div className="w-1/2 p-2">
          <UserEvents />
        </div>
        <div className="w-1/2 p-2">
          <FriendsList />
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
