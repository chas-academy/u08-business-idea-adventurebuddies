import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-center mb-4 font-bold text-2xl leading-12">
        Registrera dig här
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
            // value={username}
            // onChange={handleUsernameChange}
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
            // value={password}
            // onChange={handlePasswordChange}
            className="w-3/5 p-2 border border-buttonPurple rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col space-y-3">
            <label htmlFor="username" className="text-sm font-medium">
              Email:
            </label>
          </div>
          <input
            type="text"
            id="email"
            // value={username}
            // onChange={handleUsernameChange}
            className="w-3/5 p-2 border border-buttonPurple rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col space-y-3">
            <label htmlFor="username" className="text-sm font-medium">
              Upprepa lösenord:
            </label>
          </div>
          <input
            type="text"
            id="confirmPassword?"
            // value={username}
            // onChange={handleUsernameChange}
            className="w-3/5 p-2 border border-buttonPurple rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-around"></div>
          <button
            type="submit"
            className="w-2/5 py-2 text-textColor bg-buttonPurple text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registrera dig här!
          </button>
          <div className="">
            Har du redan ett konto?{" "}
            <Link
              to="/login"
              className="underline hover:underline-offset-4 font-bold"
            >
              Logga in här!
            </Link>
          </div>
          <div>
            <p>
              By clicking Register, you agree on our{" "}
              <a
                href="https://www.termsandconditions.game/"
                target="_blank"
                className="underline hover:underline-offset-4 font-bold"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              for Adventure Buddies.
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default RegisterPage;
