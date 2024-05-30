import { useEffect, useState } from "react";
import React from "react";
// import { IEvent2 } from "../../pages/CreateEventPage/CreateEventPage.interface";
import { useEventLatitude } from "../../store/useIEventLatitude";

const EventForm = () => {
  // Denna lagras platsen du säker på och uppdateras när användaren trycker på submit
  const [place, setPlace] = useState<string>("");
  // Denna lagrar formDatan, den blir även uppdaterad med lon, lat från api anropet
  const [formData, setFormData] = useState({
    user_id: "",
    activity: "",
    location: "",
    // start_time: new Date(),
    // spara data i unixtime, iso
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
    sendDataBackend();

    // hamtaBackend();
    // console.log("Detta är backend data", formData);

    console.log("uppdaterad", formData);
  }, [place]);

  // Get

  // const hamtaBackend = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://u08-business-idea-adventurebuddies.onrender.com/api/events/"
  //     ); // Ersätt 'URL_TILL_DIN_BACKEND' med den faktiska URL:en till din backend
  //     const contentType = response.headers.get("content-type");
  //     if (contentType && contentType.indexOf("application/json") !== -1) {
  //       const data = await response.json();
  //       console.log(data);
  //       return data;
  //     } else {
  //       const text = await response.text();
  //       console.log("Server returned non-JSON response:", text);
  //       throw new Error("Server returned non-JSON response");
  //     }
  //   } catch (error) {
  //     console.error("Ett fel inträffade:", error);
  //     throw error;
  //   }
  // };

  // Denna skickar formData till backend
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

  // Denna variabel har en funktion bundit till sig för att kunna uppdatera storen med det nya värdet
  const updateLatitude = useEventLatitude(
    (state) => state.updateLatitudeIEvent
  );
  // Denna useEffekt har triggers för att uppdatera storen när forDatas lon, lat uppdateras
  useEffect(() => {
    updateLatitude(formData.lat, formData.lon);
  }, [formData.lat, formData.lon]);

  return (
    <>
      <div>
        <label htmlFor="user_id">User ID:</label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          // value={formData.user_id}
          onChange={handleChange}
        />
      </div>
      <h1>Skapa event</h1>
      <form className="mx-auto" onSubmit={onSubmit}>
        <div>
          <label htmlFor="user_id">Användar id</label>
          <input
            type="text"
            name="user_id"
            id="user_id"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="activity" className="block text-left">
            Aktivitet:
          </label>
          <input
            type="text"
            id="activity"
            name="activity"
            className="border-solid border-2 w-full"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-left">
            Plats:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="border-solid border-2 w-full"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="start_time" className="block text-left">
            Tid och datum:
          </label>
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            className="border-solid border-2 w-1/2 mb-2"
            onChange={handleChange}
          />
          <label htmlFor="end_time" className="block text-left">
            Tid och datum:
          </label>
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
        </div>
        <div className="flex">
          <div className="mb-4 w-1/2">
            <label htmlFor="participantsMin" className="block">
              Min/max deltagare:
            </label>
            <input
              type="number"
              id="participantsMin"
              name="participantsMin"
              min="1"
              max="30"
              inputMode="numeric"
              className="border-solid border-2 w-10 mr-2"
              onChange={handleChange}
            />
            <input
              type="number"
              id="MaxDeltagare"
              name="participantsMax"
              min="1"
              max="30"
              className="border-solid border-2 w-10"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 w-1/2">
            <div className="flex">
              <label htmlFor="equipment" className="block">
                Utrustning:
              </label>
              <label htmlFor="Ja">Ja</label>
              <input
                type="radio"
                name="equipment"
                className="mr-2"
                id="Ja"
                onChange={handleChange}
              />
              <label htmlFor="Ja">Nej</label>
              <input
                type="radio"
                name="equipment"
                className="mr-2"
                id="Nej"
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              id="Utrustning"
              name="Utrustning"
              className="border-solid border-2 w-20"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="Ålder" className="">
            Ålder
          </label>
          <select
            id="Ålder"
            name="age"
            className="border-solid border-2 w-1/2 items-left"
            onChange={handleChange}
          >
            <option value="18 - 25">18 - 25</option>
            <option value="25 - 35">25 - 35</option>
            <option value="35 - 45">35 - 45</option>
            <option value="45 - 55">45 - 55</option>
            <option value="55 - 65">55 - 65</option>
            <option value="65+">65+</option>
            <option value="18+">18+</option>
          </select>
        </div>
        <div className="flex">
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
        <div className="flex">
          <div>
            <select name="price" id="price" onChange={handleChange}>
              <option value="Gratis">Gratis</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200 eller mer">200 eller mer</option>
            </select>
          </div>
          <div>
            <select name="experiance" id="experience" onChange={handleChange}>
              <option value="Nybörjare">Nybörjare</option>
              <option value="Mellanliggande">Mellanliggande</option>
              <option value="Avancerad">Avancerad</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="totalpreticipant">Antal deltagare</label>
          <input
            type="number"
            name="totalpreticipant"
            id="totalpreticipant"
            onChange={handleChange}
          />
        </div>
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
          <button className="border border-black w-2/3" type="submit">
            Skicka
          </button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
