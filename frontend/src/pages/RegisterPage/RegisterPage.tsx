import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/Input";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    dateOfBirth: "",
    // phoneNumber: "", SKA VI SKAPA DET I DB?
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hantera formulär här
  };

  return (
    <>
      <h1 className="text-center mb-4 font-bold text-2xl leading-12">
        Registrera dig här
      </h1>
      <div className="flex flex-col justify-center items-center w-full bg-gray shadow-md rounded-md p-8">
        <form
          onSubmit={handleSubmit}
          className="w-4/5 position-self-center space-y-4"
        >
          <Input
            type="text"
            label="Användarnamn"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Ange användarnamn"
          />
          <Input
            type="text"
            label="Lösenord"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Ange lösenord"
          />
          <Input
            type="text"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Ange email"
          />
          <Input
            type="text"
            label="Upprepa lösenord"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Upprepa lösenord"
          />

          <Input
            type="date"
            label="Ange födelsedatum"
            name="dateOfBirth"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Ange födelsedatum"
          />
          <Input
            type="text"
            label="Telefonnummer"
            name="Date"
            // value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Ange telefonnummer"
          />
          <button
            type="submit"
            className="w-2/5 py-2 text-textColor bg-primaryColor font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registrera dig här!
          </button>
        </form>
        <div>
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
      </div>
    </>
  );
};

export default RegisterPage;
