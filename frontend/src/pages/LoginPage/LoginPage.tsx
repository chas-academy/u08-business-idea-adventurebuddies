import { useState } from "react";
import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

interface ContextType {
  onLogin: (email: string, userId: string, token: string) => void;
}

const LoginForm: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { onLogin } = useOutletContext<ContextType>();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // const handleUsernameChange = (e: any) => setFormData(e.target.value);
  // const handlePasswordChange = (e: any) => setFormData(e.target.value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formData, checked });

    fetch(
      "https://u08-business-idea-adventurebuddies.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response data:", data);
        const { user, token } = data;

        // console.log("User logged in successfully:", data);
        // // Handle response data
        // // Redirect the user, show a success message, etc.
        if (user && user._id && token) {
          // console.log("User ID received from backend:", user._id);
          onLogin(user.email, user._id, token);
          // console.log("User ID and token stored in local storage:", {
          //   userId: localStorage.getItem("id"),
          //   token: localStorage.getItem("token"),
          // });
          navigate("/userProfile");
        } else {
          console.error("User ID or token is undefined in the response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-Poppins">
      {/* removed shadow-md from the div below */}
      <div className="box-border md:box-content bg-gray-200 rounded-md p-8 glass-container">
        <h1 className="text-center-primaryColor mb-4 leading-12 font-bold">
          Logga in
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="email" className="text-sm font-medium">
              Email:
            </label>
            <div className="w-full border p-2 rounded border-[#6278EF]">
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="password" className="text-sm font-medium">
              Lösenord:
            </label>
            <div className="w-full border p-2 rounded border-[#6278EF]">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="mr-2"
              />
              Kom ihåg mig
            </label>
            <Link
              to=""
              className="underline hover:underline-offset-4 font-bold"
            >
              Glömt lösenord?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-textColor bg-primaryColor font-Poppins font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
          >
            Logga in
          </button>
          <div className="text-center mt-4">
            Har du inget konto?{" "}
            <Link
              to="/register"
              className="underline hover:underline-offset-4 font-bold"
            >
              Registrera dig här!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
