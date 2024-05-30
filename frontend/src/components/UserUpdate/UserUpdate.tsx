import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "../input/Input";

const UserUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    gender: "",
    description: "",
    password: "",
    phoneNumber: "",
    profileImageUrl: "",
  });

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    // Funktion för att hämta data från backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/:id");
        const data = await response.json();
        setFormData(data); // Uppdatera state med data från backend
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClick = () => {
    console.log("click");
  };
  const handleClose = (e: any) => {
    e.preventDefault();
    setIsDropdownVisible(false);
  };
  return (
    <>
      <div className="col-start-1 col-end-3 ">
        <div id="updateDropdown" className="flex justify-end mr-2 mt-2">
          <FontAwesomeIcon
            icon={faGear}
            style={{ color: "#000000" }}
            onClick={handleDropdownToggle}
          />
        </div>

        {isDropdownVisible && (
          <form action="" method="post" className="absolute bg-textColor glass-container">
            <button onClick={handleClose}>
              {" "}
              <FontAwesomeIcon icon={faXmark} style={{ color: "#141414" }} />
            </button>
            <div>
              <p>Namn</p>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Användarnamn</p>
              <Input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Email</p>
              <Input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Kön</p>
              <Input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div>
              <p>Beskrivning</p>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Lösenord</p>
              <Input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Mobil nummer</p>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Activiteter</p>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Språk</p>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <Button
              type="button"
              size="small"
              variant="secondary"
              onClick={handleClick}
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
