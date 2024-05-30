import React, { useEffect, useState } from "react";
import UserUpdate from "../../components/UserUpdate/UserUpdate";
import image from "../../components/UserUpdate/rex.jpg";

const UserProfilePage = () => {

  const [formData, setFormData] = useState({
    userName: ""
  });
  
  useEffect(() => {
    // Funktion för att hämta data från backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/:id");
        const data = await response.json();
        setFormData(data); // Uppdatera state med data från backend
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

    return (
        <>      
        <div className="grid rounded-lg shadow bg-textColor mx-4 min-h-full">
        <UserUpdate/>
         <div>
          <img
            className="border rounded-full h-20 w-20 ml-2"
            src={image}
            alt="Profil bild"
          />
        </div>
        <div className="text-left ml-4">
          <h3 className="font-bold">userName</h3>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            impedit!
          </p>

          <div>
            <p>Aktiviteter:</p>
            <p className="text-xs">Dans, minigolf, frisbee</p>
          </div>
          <div>
            <p>Språk:</p>
            <p className="text-xs">Svenska, Engelska, Spanska</p>
          </div>
        </div>

        </div>
        </>
    )
}

export default UserProfilePage;