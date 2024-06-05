import React from "react";
import Navbar from "./navbar/Navbar";

interface HeaderProps {
  isAuthenticated: boolean;
  // email: string;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, logout }) => {
  return (
    <>
    <Navbar
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
    </>
  );
};

export default Header;
