import "./App.css";
import React, { useState } from "react";
import Footer from "./components/footer/Footer";
// import HomePage from "./pages/homePage/HomePage";
import { Link, Outlet } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
  };
  return (
    <>
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
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
        <li>
          <Link to="/adminProfile">Admin profile</Link>
        </li>
      </ul>
    </nav>
      {/* <Header
        isAuthenticated={isAuthenticated}
        email={email}
        onLogout={handleLogout}
      /> */}
      <main className="flex flex-col justify-center items-center z-10">
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
