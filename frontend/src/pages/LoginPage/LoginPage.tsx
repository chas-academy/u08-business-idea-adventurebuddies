import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
    console.log("Checkbox state:", !checked);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
      <h1 className="text-center mb-4 font-bold text-2xl leading-12">
        Logga in
      </h1>
      <div className="box-border md:box-content bg-gray shadow-md rounded-md p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-3">
            <label htmlFor="username" className="text-sm font-medium">
              Användarnamn:
            </label>
          </div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="w-3/5 p-2 border border-buttonPurple rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Lösenord:
            </label>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-3/5 p-2 border border-buttonPurple rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-around">
            <label className="">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />{" "}
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
            className="w-2/5 py-2 text-textColor bg-buttonPurple text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Logga in
          </button>
          <div className="">
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
    </>
  );
};

export default LoginPage;
