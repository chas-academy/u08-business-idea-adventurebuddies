import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import MapPage from "./pages/map/MapPage.tsx";
import EventInfoPage from "./pages/EventInfoPage/EventInfoPage.tsx";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage.tsx";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage.tsx";
import AdminProfilePage from "./pages/AdminProfilePage/AdminProfilePage.tsx";
import {
  AuthProvider,
  useAuth,
} from "./components/header/navbar/AuthContext.tsx";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "map", element: <MapPage /> },
      {
        path: "eventInfo",
        element: <ProtectedRoute element={<EventInfoPage />} />,
      },
      {
        path: "createEvent",
        element: <ProtectedRoute element={<CreateEventPage />} />,
      },
      {
        path: "userProfile",
        element: <ProtectedRoute element={<UserProfilePage />} />,
      },
      {
        path: "adminProfile",
        element: <ProtectedRoute element={<AdminProfilePage />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
