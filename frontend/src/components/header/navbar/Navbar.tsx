import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faHouseChimneyWindow } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons/faMap";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons/faUserLarge";
import React from "react";

interface NavbarProps {
  isAuthenticated: boolean;
  email: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  email,
  onLogout,
}) => {
  const navigate = useNavigate();

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
              <div>
                <Button
                  type="button"
                  size="small"
                  variant="secondary"
                  onClick={onLogout}
                >
                  {email}
                </Button>
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
