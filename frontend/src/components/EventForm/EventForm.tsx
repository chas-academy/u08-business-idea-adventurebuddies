import { useEffect, useState } from "react";
import { IEvent2 } from "../../../../shared/interfaces/IEvents2";
import { useEventLatitude } from "../../store/useIEventLatitude";

const EventForm = () => {
  // Denna lagras platsen du säker på och uppdateras när användaren trycker på submit
  const [place, setPlace] = useState<string>("");
  // Denna lagrar formDatan, den blir även uppdaterad med lon, lat från api anropet
  const [formData, setFormData] = useState<IEvent2>({
    activity: "",
    location: "",
    start_time: new Date(),
    participantsMin: 0,
    participantsMax: 0,
    equipment: "",
    age: "15 - 20",
    lat: "",
    lon: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlace(formData.location);
  };

  useEffect(() => {
    console.log("HAHAHA", formData.location);
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

  // Denna variabel har en funktion bundit till sig för att kunna uppdatera storen med det nya värdet
  // const updateOption = useMapsFormData((state) => state.updateOption);

  const updateLatitude = useEventLatitude(
    (state) => state.updateLatitudeIEvent
  );

  useEffect(() => {
    updateLatitude(formData.lat, formData.lon);
  }, [formData.lat, formData.lon]);

  // const { latitudeEvent } = useEventLatitude();
  // useEffect(() => {
  //   console.log("Detta är storen ", latitudeEvent.lat);
  //   console.log("Detta är storen ", latitudeEvent.lon);
  // }, [latitudeEvent]);

  return (
    <>
      <h1>Skapa event</h1>
      <form className="mx-auto" onSubmit={onSubmit}>
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
            type="time"
            id="start_time"
            name="start_time"
            className="border-solid border-2 w-1/2 mb-2"
            onChange={handleChange}
          />
          <input
            type="date"
            id="Datum"
            name="Datum"
            className="border-solid border-2 w-1/2"
            onChange={handleChange}
          />
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
            <option value="15 - 20">15 - 20</option>
            <option value="20 - 25">20 - 25</option>
            <option value="25 - 30">25 - 30</option>
            <option value="40 - 50">40 - 50</option>
            <option value="50 - 100">50 - 100</option>
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="Övrigt">Övrigt</label>
          <textarea
            rows={5}
            id="Övrigt"
            name="Övrigt"
            placeholder="Skriv här..."
            className="border-solid border-2 w-full items-left"
            onChange={handleChange}
          />
        </div>
        <div className="pt-4">
          <button className="border border-black w-2/3">Skicka</button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
