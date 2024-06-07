import { useEffect, useState } from "react";
import React from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  // Denna lagras platsen du säker på och uppdateras när användaren trycker på submit
  const [place, setPlace] = useState<string>("");

  const [equipmentNeeded, setEquipmentNeeded] = useState<boolean>(false);

  // Lägg till denna state-variabel
  const [formIfylltOchKlart, setFormIfylltOchKlart] = useState<boolean>(false);

  // Denna lagrar formDatan, den blir även uppdaterad med lon, lat från api anropet
  const [formData, setFormData] = useState({
    // user_id: "",
    activity: "",
    location: "",
    participantsMin: 0,
    participantsMax: 0,
    equipment: "",
    age: "",
    lat: "",
    lon: "",
    venue: "",
    gender: "",
    language: "",
    price: "",
    experience: "",
    totalParticipant: 0,
    message: "",
    // start_time: Date(),
    start_time: "",

    // end_time: new Date(),
  });

  // Denna uppdaterar formData konturnuelligt när användare använder formen
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // console.log("start_time");
    const { name, value } = e.target;

    if (value === "Ja") {
      setEquipmentNeeded(true);
    } else if (value === "Nej") {
      setEquipmentNeeded(false);
    }
    if (name === "start_time") {
      console.log(name, Math.floor(new Date(value).getTime() / 1000));
      const unixTimestamp = Math.floor(new Date(value).getTime() / 1000);
      // console.log("Detta är unix", unixTimestamp);
      console.log(
        "covertiing unix back to date ",
        new Date(Math.floor(new Date(value).getTime() / 1000) * 1000)
      );
      console.log(value);

      // Uppdatera formData med Unix-tidstämpeln
      setFormData({
        ...formData,
        [name]: unixTimestamp.toString(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const navigate = useNavigate();
  // Denna förhindrar sidan från att ladda om och uppdaterar Place endast vid onSubmit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIfylltOchKlart) {
      setFormIfylltOchKlart(true);
      setPlace(formData.location);
    }
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

    console.log("uppdaterad", formData);
  }, [place]);

  // Denna skickar formData till backend
  useEffect(() => {
    const sendDataBackend = async () => {
      if (formData.lat && formData.lon) {
        try {
          console.log("Detta är backend data", formData);
          const token = localStorage.getItem("token");

          const response = await fetch(
            "https://u08-business-idea-adventurebuddies.onrender.com/api/events/",
            {
              method: "POST",
              body: JSON.stringify(formData),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed");
          }
          navigate("/eventInfo");
          // Om responsen är OK, fortsätt med lämplig hantering
        } catch (error) {
          console.error("Error sending data to backend: ", error);
          // Hantera fel här
        } finally {
          setFormIfylltOchKlart(false);
        }
      }
    };
    sendDataBackend();
  }, [formData.lat, formData.lon]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-sm m-2 md:max-w-screen-sm ">
      <div className="box-border md:box-content bg-gray-200 p-2 md:py-5 glass-container ">
        <h1 className="text-center-primaryColor leading-12 font-bold text-2xl my-6 ">
          Skapa event
        </h1>
        <form
          className="flex flex-col items-center space-y-4 text-sm font-medium"
          onSubmit={onSubmit}
        >
          <div className="md:w-2/3">
            <Input
              label="Aktivitet"
              type="text"
              name="activity"
              onChange={handleChange}
              placeholder="Aktivitet"
            />
            <Input
              label="Plats"
              type="text"
              name="location"
              onChange={handleChange}
              placeholder="Plats"
            />
            <Input
              label="Datum & tid"
              type="datetime-local"
              name="start_time"
              onChange={handleChange}
            />
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
            <div>
              <p className="flex flex-start pl-4">Har Utrustning?</p>
            </div>

            <div className="flex flex-row overflow-hidden">
              <div className="place-self-start w-1/3">
                <Input
                  label="Ja"
                  type="radio"
                  name="equipment"
                  value="Ja"
                  onChange={handleChange}
                />
              </div>
              <div className="place-self-start w-1/3">
                <Input
                  label="Nej"
                  type="radio"
                  name="equipment"
                  value="Nej"
                  onChange={handleChange}
                />
              </div>
            </div>
            {equipmentNeeded && (
              <div className="w-1/3">
                <Input
                  label="Denna utrustning finns!"
                  type="text"
                  name="equipment"
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="flex flex-col items-start w-full pl-3">
              <div className="flex flex-row items-center w-full">
                <div className="flex flex-col w-full items-start">
                  <label htmlFor="Ålder" className="">
                    Ålder
                  </label>
                  <select
                    id="Ålder"
                    name="age"
                    onChange={handleChange}
                    className="w-4/5 h-full mb-3 border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
                focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
                    required
                  >
                    <option className="text-textGray">Välj Ålder...</option>

                    <option value="18 - 25">18 - 25</option>
                    <option value="25 - 35">25 - 35</option>
                    <option value="35 - 45">35 - 45</option>
                    <option value="45 - 55">45 - 55</option>
                    <option value="55 - 65">55 - 65</option>
                    <option value="65+">65+</option>
                    <option value="18+">18+</option>
                  </select>
                </div>

                <div className="flex flex-col w-full items-start">
                  <label htmlFor="Plats" className="">
                    Plats
                  </label>
                  <select
                    id="venue"
                    name="venue"
                    onChange={handleChange}
                    className="w-4/5 h-full mb-3 border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
                focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
                    required
                  >
                    <option className="text-textGray">Välj Plats...</option>

                    <option value="Inomhus">Inomhus</option>
                    <option value="Utomhus">Utomhus</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row items-center w-full">
                <div className="flex flex-col w-full items-start">
                  <label htmlFor="gender" className="">
                    Kön
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    onChange={handleChange}
                    className="w-4/5 h-full mb-3 border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
              focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
                    required
                  >
                    <option className="text-textGray">Välj Kön...</option>

                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col w-full items-start ">
                  <label htmlFor="language" className="">
                    Språk
                  </label>
                  <select
                    name="language"
                    id="language"
                    onChange={handleChange}
                    className="w-4/5 h-full mb-3 border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
                focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
                    required
                  >
                    <option className="text-textGray">Välj Språk...</option>

                    <option value="Svenska">Svenska</option>
                    <option value="Engelska">Engelska</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row items-center w-full">
                <div className="flex flex-col items-start w-full">
                  <label htmlFor="price" className="">
                    Pris
                  </label>
                  <select
                    name="price"
                    id="price"
                    onChange={handleChange}
                    className="w-4/5 h-full mb-3 border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
                focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
                    required
                  >
                    <option className="text-textGray">Välj Pris...</option>

                    <option value="Gratis">Gratis</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200 eller mer">200 eller mer</option>
                  </select>
                </div>

                <div className="flex flex-col items-start w-full">
                  <label htmlFor="experience" className="">
                    Erfarenhet
                  </label>
                  <select
                    name="experience"
                    id="experience"
                    onChange={handleChange}
                    className="w-4/5 h-full mb-3 border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
                focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
                    required
                  >
                    <option>Välj Erfarenhet...</option>

                    <option value="Nybörjare" className="text-textGray">
                      Nybörjare
                    </option>
                    <option value="Mellanliggande">Mellanliggande</option>
                    <option value="Avancerad">Avancerad</option>
                  </select>
                </div>
              </div>
            </div>

            <Input
              label="Antal deltagare"
              type="number"
              name="totalParticipants"
              onChange={handleChange}
            />

            <div className="flex flex-col items-start justify-center px-3">
              <label htmlFor="Övrigt">Övrigt</label>
              <textarea
                rows={5}
                id="Övrigt"
                name="message"
                placeholder="Skriv här..."
                onChange={handleChange}
                className="rounded border border-primaryColor w-full p-1"
              />
            </div>
          </div>
          <Button type="submit" variant="primary">
            Skicka
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
