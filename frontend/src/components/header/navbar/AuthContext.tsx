import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  email: string;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || "";
  });

  const login = (email: string) => {
    setIsAuthenticated(true);
    setEmail(email);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
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
