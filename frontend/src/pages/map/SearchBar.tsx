import { ChangeEvent, useEffect, useState } from "react";
import { useMapsFormData } from "../../store/useMapsFormData";

// Uppdatera store med värden

function SearchBar() {
  // Denna useState tar emot ordet som skrivs in i search
  const [place, setPlace] = useState<string>("");
  // Denna useState behövs för att man ska kunna se uppdateringar i inputrutan för text
  const [searchWord, setSearchWord] = useState<string>("");
  // Denna useState lagrar den sökta location datan med long lat etc
  const [locationData, setLocationData] = useState<LocationData>({
    lat: "",
    lon: "",
  });
  // Detta är Usestate för Input Button som är inställda på default på option1
  const [selectedValue, setSelectedValue] = useState<string>("option1");

  // Interface förlocationData

  interface LocationData {
    lat: string;
    lon: string;
  }

  // OLLIIIIEEEE
  // Denna funktion anropar storen för att kunna använda dess två olika funktioner

  // const { userLocation, updateUserLocation } = useMapsFormData();
  const userLocation = useMapsFormData((state) => state.userLocation);
  console.log("Here is userlocation", userLocation);
  const updateUserLocation = useMapsFormData(
    (state) => state.updateUserLocation
  );

  const option = useMapsFormData((state) => state.option);
  const updateOption = useMapsFormData((state) => state.updateOption);
  console.log("OPPPPPTIN", option);
  // Funktion för att uppdatera storen med värden
  const updateStoreWithLongLat = () => {
    updateUserLocation(locationData.lat, locationData.lon);
  };

  useEffect(() => {
    updateStoreWithLongLat();
    // console.log("Sitter dom?", locationData.lat);
  }, [locationData]);

  useEffect(() => {
    updateOption(selectedValue);
  }, [selectedValue]);

  // Denna gör ett api anrop och hämtar information om serwordet som du har matat in
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (place) {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${place}&format=json&addressdetails=1&limit=1&polygon_svg=1`
          );
          const jsonData = await response.json();
          setLocationData(jsonData[0]);
          console.log("Detta är ", jsonData[0]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [place]);

  // Handlechange är i onChange i textinput så när användaren trycker på tangenterna så
  // triggas handlechange och lägger in bokstaven i searchWork som uppdateras input i value med vad som finns.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };
  // Denna finns i inputs och triggas när man väljer input
  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    // console.log("Optiooon", selectedValue);
  };
  // Denna triggas när man skickar formen
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPlace(searchWord);
  };

  return (
    <>
      <form action="searchForm">
        <label htmlFor="searchInput">Skriv ett ord</label>
        <input
          type="text"
          value={searchWord}
          name="nameOfVariabels"
          id="searchInput"
          onChange={handleChange}
          className="border border-gray-400 px-2"
        />{" "}
        <br />
        <label>
          Angel Map
          <input
            type="radio"
            value="option1"
            checked={selectedValue === "option1"}
            onChange={handleChangeRadio}
          />
        </label>
        <label>
          Battle Map
          <input
            type="radio"
            value="option2"
            checked={selectedValue === "option2"}
            onChange={handleChangeRadio}
          />
        </label>
        <button onClick={handleSubmit}>Klicka</button>
      </form>

      {/* <div>
        <Maps1 />
      </div>
      <div>
        <Maps2 locationData={locationData} option={selectedValue} />
      </div> */}
    </>
  );
}

export default SearchBar;
