import "./App.css";
import React from "react";
import Footer  from "./components/footer/Footer";
// import HomePage from "./pages/homePage/HomePage";
import { Link, Outlet } from 'react-router-dom'


function App() {
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
    <main className="flex flex-col justify-center items-center z-10">
      <Outlet />
    </main>
    <Footer />
    </>
  );
}

export default App;
