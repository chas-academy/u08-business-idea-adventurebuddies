import { ChangeEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Maps1 from "./Maps1";

function App() {
  const [count, setCount] = useState(0);
  const [place, setPlace] = useState<string>("");
  const [locationData, setlocationData] = useState(null);

  // Problemet verkar vara att du måste installera leafletjs för att göra en proxyserver som kan skicka request till OSM
  // Genom att göra detta kan du skicka request till sidan om du gör en sådan fil måste du no använda zustand för att kunna skicka runt propps.

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (place) {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${place}&format=json&addressdetails=1&limit=1&polygon_svg=1`
          );
          const jsonData = await response.json();
          console.log("location", jsonData);
          setlocationData(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [place]);

  // Denna useState behövs för att man ska kunna se uppdateringar i inputrutan för text
  const [searchWord, setSearchWord] = useState<string>("");
  // Handlechange är i onChange i textinput så när användaren trycker på tangenterna så
  // triggas handlechange och lägger in bokstaven i searchWork som uppdateras input i value med vad som finns.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const inputInDom = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    if (inputInDom) {
      const placeFromDom = inputInDom.value;

      setPlace(placeFromDom);
    }
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
        <button onClick={handleSubmit}>Klicka</button>
      </form>

      <div>
        <Maps1 />
      </div>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
