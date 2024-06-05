import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faHouseChimneyWindow } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons/faMap";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons/faUserLarge";
import React, { useEffect, useRef, useState } from "react";
import { UserPage } from "../../../pages/UserProfilePage/UserProfilePage.interface";

interface NavbarProps {
  isAuthenticated: boolean;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, logout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const [localStorageUpdated, setLocalStorageUpdated] = useState("");  
  const dropdownRef = useRef<HTMLDivElement>(null);
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
        console.log("User data:", data);
        setUserData(data);
      } catch (error) {
        console.error("Fetch user data error:", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, localStorageUpdated]);

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token") || ""; // Använd en tom sträng som standardvärde
      setLocalStorageUpdated(token);
    };
    handleStorageChange();
}, []);

  const handleChange = () => {
    navigate("/login");
  };
  return (
    <>
      <nav className="font-poppins m-10 xl:m-0 xl:my-10  h-[100px]">
        <div className="flex flex-row items-center justify-center ">
          <div className="hidden sm:contents basis-1/4">
            <Link
              to="/"
              className="hover:border-b-4 border-primaryColor text-base lg:text-xl hover:scale-125"
            >
              Hem
            </Link>
            <Link
              to="/createEvent"
              className="md:ml-6 lg:ml-10 hover:border-b-4 border-primaryColor text-base lg:text-xl w-40 hover:scale-125"
            >
              Nytt event <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          <div className="basis-1/2">
            <Link
              to="/"
              className="text-primaryColor font-medium text-md sm:text-base ms:text-lg lg:text-xl xl:text-2xl"
            >
              Adventure
              <span className="text-darkPurple ml-4">
                <br /> Buddies
              </span>
            </Link>
          </div>
          <div className="hidden sm:contents basis-1/4">
            <button className="mx-4 py-2 px-3 rounded-full shadow-xl hover:scale-125 hover:ring hover:ring-primaryColor">
              <Link to="/">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Link>
            </button>
            {isAuthenticated ? (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <Button
                  type="button"
                  size="small"
                  variant="secondary"
                  onClick={handleDropdownToggle}
                >
                  {userData.userName}
                </Button>
                {isDropdownVisible && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      zIndex: 1000,
                    }}
                  >
                    <Link
                      to={"/"}
                      onClick={logout}
                      style={{
                        display: "block",
                        padding: "10px",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      Logga ut
                    </Link>
                    <Link
                      to={"/userProfile"}
                      style={{
                        display: "block",
                        padding: "10px",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      Profil
                    </Link>
                    <Link
                      to={"/createEvent"}
                      style={{
                        display: "block",
                        padding: "10px",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      Skapa event
                    </Link>
                    <Link
                      to={"/eventInfo"}
                      style={{
                        display: "block",
                        padding: "10px",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      Event Info
                    </Link>
                    <Link
                      to={"/map"}
                      style={{
                        display: "block",
                        padding: "10px",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      Map
                    </Link>
                    
                  </div>
                )}
              </div>
            ) : (
              <Button
                type="button"
                size="small"
                variant="secondary"
                onClick={handleChange}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        <div className="py-6 sm:hidden fixed bottom-0 left-0 w-full bg-textColor z-10">
          <ul className="grid grid-cols-5">
            <li className="px-6">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faHouseChimneyWindow}
                  style={{ color: "#1E0707" }}
                />
              </Link>
            </li>
            <li className="px-6">
              <Link to="/map">
                <FontAwesomeIcon icon={faMap} style={{ color: "#1e0707" }} />
              </Link>
            </li>
            <li className="px-6">
              <Link to="/createEvent">
                <FontAwesomeIcon icon={faPlus} style={{ color: "#1E0707" }} />
              </Link>
            </li>
            <li className="px-6">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#1E0707" }}
                />
              </Link>
            </li>
            <li className="px-6">
              <Link to="/userProfile">
                <FontAwesomeIcon
                  icon={faUserLarge}
                  style={{ color: "#1E0707" }}
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
