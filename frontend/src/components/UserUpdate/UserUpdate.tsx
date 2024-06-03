import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Input from "../input/Input";
import { UserPage } from "../../pages/UserProfilePage/UserProfilePage.interface";
import { useNavigate } from "react-router-dom";

interface UserUpdateProps {
  userData: UserPage;
  setUserData: React.Dispatch<React.SetStateAction<UserPage>>;
}

const UserUpdate: React.FC<UserUpdateProps> = ({ userData, setUserData }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const [deleteMessage, setDeleteMessage] = useState("");

  const [formData, setFormData] = useState<UserPage>({
    userName: userData.userName,
    description: userData.description,
    profileImageUrl: userData.profileImageUrl,
    name: userData.name,
    email: userData.email,
    gender: userData.gender,
    phoneNumber: userData.phoneNumber,
    password: userData.password,
  });

  // Hämtar och visar datan i formet från db
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      if (!id || !token) {
        throw new Error("User ID or token not found in local storage");
      }

      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUserData = await response.json();
      setUserData(updatedUserData); // Update the state in UserProfilePage
      setIsDropdownVisible(false); // Close the dropdown
    } catch (error) {
      console.error("Update user data error:", error);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleRemoveAccount = async () => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      if (!id || !token) {
        throw new Error("User ID or token not found in local storage");
      }

      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.status);

      if (response.ok) {
        setDeleteMessage("Ditt konto har blivit borttaget.");
      } else {
        throw new Error("Lyckades inte radera ditt konto");
      }
      console.log("Account deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Update user data error:", error);
    }
  };

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
            action="submit"
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
              onClick={handleRemoveAccount}
            >
              Radera konto
            </Button>
            {deleteMessage && <p className="text-success">{deleteMessage}</p>}
          </form>
        )}
      </div>
    </>
  );
};

export default UserUpdate;
