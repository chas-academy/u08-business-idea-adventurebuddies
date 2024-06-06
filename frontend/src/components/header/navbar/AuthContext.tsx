import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  email: string;
  userId: string | null;
  token: string | null;
  login: (email: string, userId: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("id"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));


  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const storedEmail = localStorage.getItem("email");
    const storedUserId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("token");

    if (storedIsAuthenticated && storedEmail && storedUserId && storedToken) {
      setIsAuthenticated(true);
      setEmail(storedEmail);
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  const login = (email: string, userId: string, token: string) => {
    setIsAuthenticated(true);
    setEmail(email);
    setUserId(userId);
    setToken(token);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("id", userId);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setUserId(null);
    setToken(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("email");
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
