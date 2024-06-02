import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Input from "../input/Input";
import { UserPage } from "../../pages/UserProfilePage/UserProfilePage.interface";


interface UserUpdateProps {
  userData: UserPage;
  setUserData: React.Dispatch<React.SetStateAction<UserPage>>
}

const UserUpdate: React.FC<UserUpdateProps> = ({ userData, setUserData }) => {
  const handleClick = () => {
    console.log("click");
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [formData, setFormData] = useState({
    userName: userData.userName,
    description: userData.description,
    profileImageUrl: userData.profileImageUrl,
    name: userData.name,
    email: userData.email,
    gender: userData.gender,
    phoneNumber: userData.phoneNumber,
    password: userData.password,
  });

  useEffect(() => {
    setFormData({
      userName: userData.userName,
      description: userData.description,
      profileImageUrl: userData.profileImageUrl,
      name: userData.name,
      email: userData.email,
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
    });
  }, [userData]);
  
  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      if (!id || !token) {
        throw new Error('User ID or token not found in local storage');
      }

      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUserData  = await response.json();
      setUserData(updatedUserData ); // Update the state in UserProfilePage
      setIsDropdownVisible(false); // Close the dropdown
    } catch (error) {
      console.error('Update user data error:', error);
    }
  };

  // useEffect(() => {
  //   // Hämta användaruppgifter
  //   // const id = ;
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`/api/user/`);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

    // Hämta händelsedetaljer
  //   const fetchEventData = async () => {
  //     try {
  //       const response = await fetch("/api/event");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setEventData(data);
  //     } catch (error) {
  //       console.error("Error fetching event data:", error);
  //     }
  //   };

  //   fetchUserData();
  //   fetchEventData();
  // }, []);

  // const handleDropdownToggle = () => {
  //   setIsDropdownVisible(!isDropdownVisible);
  // };
  return (
    <>
      <div className="col-start-1 col-end-3">
        <div id="updateDropdown" className="flex justify-end mr-2 mt-2">
          <FontAwesomeIcon
            icon={faGear}
            style={{ color: "#000000" }}
            onClick={handleDropdownToggle}
          />
        </div>

        {isDropdownVisible && (
          <form
            action=""
            method="post"
            className="absolute right-2 top-60 bg-textColor"
          >
            <div>
              <p>Profilbild URL</p>
              <Input
                type="text"
                name="profileImageUrl"
                value={formData.profileImageUrl || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Namn</p>
              <Input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Användarnamn</p>
              <Input
                type="text"
                name="userName"
                value={formData.userName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Email</p>
              <Input
                type="text"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Kön</p>
              <Input
                type="text"
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div>
              <p>Beskrivning</p>
              <Input
                type="text"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Ändra lösenord</p>
              <Input
                type="text"
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Mobil nummer</p>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleInputChange}
              />
            </div>
            <Button
              type="button"
              size="small"
              variant="secondary"
              onClick={handleUpdate}
            >
              Uppdatera konto
            </Button>
            <Button
              type="button"
              size="small"
              variant="danger"
              onClick={handleClick}
            >
              Radera konto
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default UserUpdate;

