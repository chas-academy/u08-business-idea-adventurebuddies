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
    <div className="flex flex-col">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <main className="flex-grow flex flex-col justify-center items-center mb-20 md:mb-0">
        <Outlet
          context={{
            onLogin: handleLogin,
            onLogout: handleLogout,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
