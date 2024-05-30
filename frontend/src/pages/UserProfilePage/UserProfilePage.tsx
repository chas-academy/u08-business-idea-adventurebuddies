import React, { useEffect, useState } from "react";
import UserUpdate from "../../components/UserUpdate/UserUpdate";

const UserProfilePage = () => {

  const [formData, setFormData] = useState({
    userName: "",
    description: "",
    profileImageUrl:""
  });
  
  useEffect(() => {
    // Funktion för att hämta data från backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/:id");
        const data = await response.json();
        setFormData(data);
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
            src={formData.profileImageUrl}
            alt="Profil bild"
          />
        </div>
        <div className="text-left ml-4">
          <h3 className="font-bold">{formData.userName}</h3>
          <p className="text-xs">
            {formData.description}
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
