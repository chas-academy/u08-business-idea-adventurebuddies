import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Input from "../input/Input";
import { IEvent } from "../../../../backend/src/interfaces/IEvent";
import { IUser } from "../../../../backend/src/interfaces/IUser";

const UserUpdate = () => {
  const handleClick = () => {
    console.log("click");
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [eventData, setEventData] = useState<IEvent | null>(null);

  useEffect(() => {
    // Hämta användaruppgifter
    // const id = ;
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Hämta händelsedetaljer
    const fetchEventData = async () => {
      try {
        const response = await fetch("/api/event");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchUserData();
    fetchEventData();
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
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

        {isDropdownVisible && userData && eventData &&  (
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
                value={userData.profileImageUrl || ""}
                onChange={handleClick}
              />
            </div>
            <div>
              <p>Namn</p>
              <Input
                type="text"
                name="name"
                value={userData.name || ""}
                onChange={handleClick}
              />
            </div>
            <div>
              <p>Användarnamn</p>
              <Input
                type="text"
                name="userName"
                value={userData.userName || ""}
                onChange={handleClick}
              />
            </div>
            <div>
              <p>Email</p>
              <Input
                type="text"
                name="email"
                value={userData.email || ""}
                onChange={handleClick}
              />
            </div>
            <div>
              <p>Kön</p>
              <Input
                type="text"
                name="gender"
                value={userData.gender || ""}
                onChange={handleClick}
              />
            </div>{" "}
            <div>
              <p>Beskrivning</p>
              <Input
                type="text"
                name="description"
                value={userData.description || ""}
                onChange={handleClick}
              />
            </div>
            <div>
              <p>Lösenord</p>
              <Input
                type="text"
                name="password"
                value={userData.password || ""}
                onChange={handleClick}
              />
            </div>
            <div>
              <p>Mobil nummer</p>
              <Input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber || ""}
                onChange={handleClick}
              />
            </div>
            <div>
              <p>Activiteter</p>
              <Input
                type="text"
                name="activity"
                value={eventData.activity || ""}
                onChange={handleClick}
              />
            </div>
            <div>
              <p>Språk</p>
              <Input
                type="text"
                name="language"
                value={eventData.language || ""}
                onChange={handleClick}
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

