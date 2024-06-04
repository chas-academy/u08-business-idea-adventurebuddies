import React from "react";
import Navbar from "./navbar/Navbar";

interface HeaderProps {
  isAuthenticated: boolean;
  email: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <>
    <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
    </>
  );
};

export default Header;
