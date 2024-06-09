import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "../input/Input";
import { UserPage } from "../../pages/UserProfilePage/UserProfilePage.interface";
import { useNavigate, useOutletContext } from "react-router-dom";

interface UserUpdateProps {
  userData: UserPage;
  setUserData: React.Dispatch<React.SetStateAction<UserPage>>;
}

interface ContextType {
  onLogout: () => void;
}

const UserUpdate: React.FC<UserUpdateProps> = ({ userData, setUserData }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { onLogout } = useOutletContext<ContextType>();

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
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      if (!id || !token) {
        throw new Error("User ID or token not found in local storage");
      }

      const response = await fetch(
        `https://u08-business-idea-adventurebuddies.onrender.com/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUserData = await response.json();
      setUserData(updatedUserData.updatedUser);
      setIsDropdownVisible(false);
    } catch (error) {
      console.error("Update user data error:", error);
    }
  };

  const handleRemoveAccount = async () => {
    // Extra bekräftelse ifall man råkar trycka på radera och det inte var meningen.
    const confirmed = window.confirm(
      "Är du säker på att du vill radera ditt konto?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      if (!id || !token) {
        throw new Error("User ID or token not found in local storage");
      }

      const response = await fetch(
        `https://u08-business-idea-adventurebuddies.onrender.com/api/users/me`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.status);

      if (response.ok) {
        window.alert("Ditt konto har blivit borttaget.");

        localStorage.removeItem("id");
        localStorage.removeItem("token");

        console.log("Account deleted successfully");

        navigate("/login");
      } else {
        throw new Error("Lyckades inte radera ditt konto");
      }
    } catch (error) {
      console.error("Update user data error:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div className="col-start-1 col-end-3">
        <div
          id="updateDropdown"
          className="flex justify-end mr-2 mt-2 xl:mr-4"
        >
          <FontAwesomeIcon
            icon={faGear}
            style={{ color: "#000000" }}
            onClick={toggleDropdown}
          />
        </div>

        {isDropdownVisible && (
          <form
            action="submit"
            method="post"
            className="absolute left-auto right-auto top-[370px] bg-textColor glass-container z-20 my-8"
          >
            <div className="mt-4">
              <FontAwesomeIcon
                icon={faXmark}
                size="xl"
                style={{ color: "#000000" }}
                onClick={toggleDropdown}
              />
            </div>
            <div className="my-4">
              <p>Profilbild</p>
              <input
                className="ml-32 my-4"
                type="file"
                name="profileImageUrl"
                accept="image/*"
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
            {/* <div>
              <p>Ändra lösenord</p>
              <Input
                type="text"
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
              />
            </div> */}
            <div>
              <p>Mobil nummer</p>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className=" m-6">
              <div className="pb-6">
                <Button
                  type="button"
                  size="small"
                  variant="primary"
                  onClick={handleUpdate}
                >
                  Spara
                </Button>
              </div>
              <div className="pb-6 md:hidden">
                {/* Utloggnigs knapp i mobil vy */}
                <Button
                  type="button"
                  size="small"
                  variant="secondary"
                  onClick={onLogout}
                >
                  Logga ut
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  size="small"
                  variant="danger"
                  onClick={handleRemoveAccount}
                >
                  Radera konto
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UserUpdate;
