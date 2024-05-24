import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx'
import MapPage from './pages/map/MapPage.tsx'
import EventInfoPage from './pages/EventInfoPage/EventInfoPage.tsx'
import CreateEventPage from './pages/CreateEventPage/CreateEventPage.tsx'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage.tsx'
import AdminProfilePage from './pages/AdminProfilePage/AdminProfilePage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <App/>
      </>
    ),
    children: [
      { path: "", element: <HomePage/> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "map", element: <MapPage /> },
      { path: "eventInfo", element: <EventInfoPage /> },
      { path: "createEvent", element: <CreateEventPage /> },
      { path: "userProfile", element: <UserProfilePage /> },
      { path: "adminProfile", element: <AdminProfilePage /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
