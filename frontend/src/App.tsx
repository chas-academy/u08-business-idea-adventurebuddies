import "./App.css";
import React, { useState } from "react";
import Footer from "./components/footer/Footer";
// import HomePage from "./pages/homePage/HomePage";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        email={email}
        onLogout={handleLogout}
      />
      {/* <nav className="flex flex-row justify-center min-w-screen">
        <ul className="flex flex-row justify-between w-2/3">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/eventInfo">Event info</Link>
          </li>
          <li>
            <Link to="/createEvent">Create event</Link>
          </li>
          <li>
            <Link to="/userProfile">User profile</Link>
          </li>
        </ul>
      </nav> */}

      <main className="flex flex-col justify-center items-center z-10 mt-10">
        <Outlet
          context={{
            onLogin: handleLogin,
          }}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
