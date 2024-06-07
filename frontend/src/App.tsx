import "./App.css";
import React from "react";
import Footer from "./components/footer/Footer";
// import HomePage from "./pages/homePage/HomePage";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import { useAuth } from "./components/header/navbar/AuthContext";

function App() {
  const navigate = useNavigate();
  const { login, logout, isAuthenticated } = useAuth();

  const handleLogin = (email: string, userId: string, token: string) => {
    login(email, userId, token);
    navigate("/userProfile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        logout={handleLogout}
      />
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
