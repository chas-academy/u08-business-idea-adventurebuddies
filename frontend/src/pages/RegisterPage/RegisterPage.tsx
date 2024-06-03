import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/Input";
import React from "react";
import Button from "../../components/button/Button";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    password: "",
    email: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hantera formulär här

    fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRegistrationStatus("error");
        } else {
          setRegistrationStatus("success");
        }

        console.log("Användaren är registrerad:", data);
        // Handle response data
        // Redirect the user, show a success message, etc.
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  return (
    <>
      {registrationStatus === "success" && (
        <div className="alert alert-success" role="alert">
          <p className="text-green-700">Registrering lyckad!</p>
        </div>
      )}
      {registrationStatus === "error" && (
        <div className="alert alert-error" role="alert">
          <p className="text-red-700">
            Registrering misslyckad. Var god prova igen.
          </p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen max-w-sm m-2 md:max-w-screen-sm font-Poppins">
        <div className="box-border md:box-content bg-gray-200 p-2 md:px-20 md:py-10 glass-container">
          <h1 className="text-center-primaryColor leading-12 font-bold text-2xl my-6">
            Registrera dig här
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-sm font-medium"
          >
            <div className="flex flex-col">
              <Input
                type="text"
                label="Namn*"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ange användarnamn"
              />
              <Input
                type="text"
                label="Användarnamn**"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Ange användarnamn"
              />
              {/* Försök att snygga till detta meddelande */}
              <small className="text-gray-500 mt-1 italic">
                **Undvik att använda någon personlig identifierbar information
                när du skapar ditt användarnamn, såsom ditt efternamn,
                födelsedatum, adress eller personnummer.
              </small>
              <Input
                type="text"
                label="Email*"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ange email"
              />
              <Input
                type="password"
                label="Lösenord*"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Ange lösenord"
              />
              <Input
                type="password"
                label="Upprepa lösenord*"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Upprepa lösenord"
              />
              <Input
                type="date"
                label="Ange födelsedatum*"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                placeholder="Ange födelsedatum"
              />
              <label
                htmlFor="gender"
                className="flex flex-col items-start pl-3 mb-0"
              >
                Kön*
              </label>
              <div className="flex flex-col items-start w-full pl-3">
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  className="w-2/5 h-full border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
                focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
                >
                  <option value="">Välj kön</option>
                  <option value="female">Kvinna</option>
                  <option value="male">Man</option>
                  <option value="non-binary">Icke-binär</option>
                  <option value="other">Annat</option>
                </select>
              </div>
              <Input
                type="text"
                label="Telefonnummer*"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Ange telefonnummer"
              />
            </div>
            <div>
              <p>
                Genom att registrera dig accepterar du våra{" "}
                <a
                  href="https://www.termsandconditions.game/"
                  target="_blank"
                  className="underline hover:underline-offset-4 font-bold"
                  rel="noopener noreferrer"
                >
                  Användarvillkor
                </a>{" "}
                av Adventure Buddies.
              </p>
            </div>
            <Button type="submit" variant="primary">
              Skapa konto
            </Button>
          </form>
          <br></br>
          <div className="flex flex-row justify-center py-3">
            <p className="pr-2">Har du redan ett konto?</p>
            <Link
              to="/login"
              className="underline hover:underline-offset-4 font-bold"
            >
              Logga in här!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
