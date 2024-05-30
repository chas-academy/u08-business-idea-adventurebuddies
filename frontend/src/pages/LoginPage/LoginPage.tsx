import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);
  const handleChange = (e: any) => setChecked(e.target.checked);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ username, password, checked });
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
            <label htmlFor="username" className="text-sm font-medium">
              Användarnamn:
            </label>
            <div className="w-full border p-2 rounded border-[#6278EF]">
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
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
                value={password}
                onChange={handlePasswordChange}
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
