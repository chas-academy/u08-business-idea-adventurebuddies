import { useEffect, useState } from "react";
import React from "react";
// import { IEvent2 } from "../../pages/CreateEventPage/CreateEventPage.interface";
import { useEventLatitude } from "../../store/useIEventLatitude";
import Input from "../input/Input";
import Button from "../button/Button";

const EventForm = () => {
  // Denna lagras platsen du säker på och uppdateras när användaren trycker på submit
  const [place, setPlace] = useState<string>("");
  // Denna lagrar formDatan, den blir även uppdaterad med lon, lat från api anropet
  const [formData, setFormData] = useState({
    user_id: "",
    activity: "",
    location: "",
    participantsMin: 0,
    participantsMax: 0,
    equipment: "",
    age: "18+",
    lat: "",
    lon: "",
    venue: "Inomhus",
    gender: "Female",
    language: "Svenska",
    price: 0,
    experience: "Nybörjare",
    totalParticipant: 0,
    message: "",

    // end_time: new Date(),
  });

  // Denna uppdaterar formData konturnuelligt när användare använder formen
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "start_time") {
      console.log(name, Math.floor(new Date(value).getTime() / 1000));
      console.log(
        "covertiing unix back to date ",
        new Date(Math.floor(new Date(value).getTime() / 1000) * 1000)
      );
      console.log(value);
      // start with ISO time otherwise this time
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Denna förhindrar sidan från att ladda om och uppdaterar Place endast vid onSubmit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlace(formData.location);
  };

  // Denna gör ett API kall när Place ändras och sätter sedan lon, lat kordinaterna in i formdata
  useEffect(() => {
    const fetchData = async () => {
      if (place) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${place}&format=json&addressdetails=1&limit=1&polygon_svg=1`
          );
          const jsonData = await response.json();
          const lon = jsonData[0]["lon"];
          const lat = jsonData[0]["lat"];
          setFormData({
            ...formData,
            lon: lon,
            lat: lat,
          });
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };
    fetchData();

    // hamtaBackend();
    // console.log("Detta är backend data", formData);

    console.log("uppdaterad", formData);
  }, [place]);

  // Denna skickar formData till backend
  useEffect(() => {
    const sendDataBackend = async () => {
      if (formData.lat && formData.lon) {
        try {
          console.log("Detta är backend data", formData);

          const response = await fetch("http://localhost:3000/api/events/", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed");
          }
          // Om responsen är OK, fortsätt med lämplig hantering
        } catch (error) {
          console.error("Error sending data to backend: ", error);
          // Hantera fel här
        }
      }
    };
    sendDataBackend();
  }, [formData.lat, formData.lon]);

  // Denna variabel har en funktion bundit till sig för att kunna uppdatera storen med det nya värdet
  // const updateLatitude = useEventLatitude(
  //   (state) => state.updateLatitudeIEvent
  // );
  // Denna useEffekt har triggers för att uppdatera storen när formData lon, lat uppdateras
  // useEffect(() => {
  //   updateLatitude(formData.lat, formData.lon);
  // }, [formData.lat, formData.lon]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-sm m-2 md:max-w-screen-sm font-Poppins">
      <div className="box-border md:box-content bg-gray-200 p-2 md:px-20 md:py-10 glass-container">
        <h1>Skapa event</h1>
        <form className="space-y-4 text-sm font-medium" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <Input
              label="User_ID"
              type="text"
              name="user_id"
              onChange={handleChange}
            />
            <Input
              label="Aktivitet"
              type="text"
              name="activity"
              onChange={handleChange}
            />
            <Input
              label="Plats"
              type="text"
              name="location"
              onChange={handleChange}
            />
            <label htmlFor="start_time" className="block text-left"></label>
            <Input
              label="Datum & tid"
              type="datetime-local"
              name="start_time"
              timeName="end_time"
              onChange={handleChange}
            />
            {/* <label htmlFor="end_time" className="block text-left">
            Tid och datum:
          </label> */}
            {/* <input
            type="time"
            id="end_time"
            name="end_time"
            className="border-solid border-2 w-1/2 mb-2"
            onChange={handleChange}
          /> */}
            {/* <input
            type="date"
            id="Datum"
            name="Datum"
            className="border-solid border-2 w-1/2"
            onChange={handleChange}
          /> */}
            <div className="">
              <Input
                label="Min/max deltagare:"
                type="number"
                name="participantsMin"
                min="1"
                max="30"
                inputMode="numeric"
                onChange={handleChange}
              />
              <Input
                type="number"
                name="participantsMax"
                min="1"
                max="30"
                onChange={handleChange}
              />
              <div className="flex flex-row">
                <Input
                  label="Ja"
                  type="radio"
                  name="equipment"
                  onChange={handleChange}
                />
                <Input
                  label="Nej"
                  type="radio"
                  name="equipment"
                  onChange={handleChange}
                />
              </div>
              <Input
                label="Denna utrustning finns!"
                type="text"
                name="Utrustning"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="Ålder" className="">
                Ålder
              </label>
              <select id="Ålder" name="age" onChange={handleChange}>
                <option value="18 - 25">18 - 25</option>
                <option value="25 - 35">25 - 35</option>
                <option value="35 - 45">35 - 45</option>
                <option value="45 - 55">45 - 55</option>
                <option value="55 - 65">55 - 65</option>
                <option value="65+">65+</option>
                <option value="18+">18+</option>
              </select>
            </div>
            <div className="">
              <div>
                <select
                  id="venue"
                  name="venue"
                  className=""
                  onChange={handleChange}
                >
                  <option value="Inomhus">Inomhus</option>
                  <option value="Utomhus">Utomhus</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div>
                <select name="gender" id="gender" onChange={handleChange}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <select name="language" id="language" onChange={handleChange}>
                  <option value="Svenska">Svenska</option>
                  <option value="Engelska">Engelska</option>
                </select>
              </div>
            </div>
            <div className="">
              <div>
                <select name="price" id="price" onChange={handleChange}>
                  <option value="Gratis">Gratis</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200 eller mer">200 eller mer</option>
                </select>
              </div>
              <div>
                <select
                  name="experiance"
                  id="experience"
                  onChange={handleChange}
                >
                  <option value="Nybörjare">Nybörjare</option>
                  <option value="Mellanliggande">Mellanliggande</option>
                  <option value="Avancerad">Avancerad</option>
                </select>
              </div>
            </div>
            <Input
              label="Antal deltagare"
              type="number"
              name="totalpreticipant"
              onChange={handleChange}
            />
            <div className="flex flex-col items-start">
              <label htmlFor="Övrigt">Övrigt</label>
              <textarea
                rows={5}
                id="Övrigt"
                name="message"
                placeholder="Skriv här..."
                className="border-solid border-2 w-full items-left"
                onChange={handleChange}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" variant="primary">
                Skicka
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
