import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapsFormData } from "../../store/useMapsFormData";
import React from "react";

const Maps2 = () => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  // Usestate för hämtade activity, lon, lat från backend

  const [backendMarker, setBackendMarker] = useState<
    {
      lat: number;
      lon: number;
      activity: string;
    }[]
  >([]);

  useEffect(() => {
    const hamtaBackend = async () => {
      try {
        const response = await fetch(
          "https://u08-business-idea-adventurebuddies.onrender.com/api/events/"
        ); // Ersätt 'URL_TILL_DIN_BACKEND' med den faktiska URL:en till din backend
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          console.log("Detta är backedn data", data);
          setBackendMarker(data);
          return data;
        } else {
          const text = await response.text();
          console.log("Server returned non-JSON response:", text);
          throw new Error("Server returned non-JSON response");
        }
      } catch (error) {
        console.error("Ett fel inträffade:", error);
        throw error;
      }
    };
    hamtaBackend();
    console.log("Detta är markerrrrrrr", backendMarker);
  }, []);

  // Denna hämtar värdena från store till lat, lon
  const { userLocation } = useMapsFormData((state) => ({
    userLocation: state.userLocation.locationData,
  }));

  // Uppdaterar Lat,Lon med nya värden från store
  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lon) {
      const { lat, lon } = userLocation;
      setLatitude(lat);
      setLongitude(lon);
    }
  }, [userLocation]);

  //Hämtar Option från store
  const option = useMapsFormData((state) => state.option);

  // Hämtar nyckeln till battlemap i .env filen
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  //Denna Hämtar geolacation och sätter in Lat och Long i usestate när komonenten skapas
  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      });
    };
    getUserLocation();
  }, []);

  // Kollar så att värdet är ett validerade nummer, är det ett nummer så omvandlas det till ett floating-point nummer (NaN(Not-a-Number))
  const isValidNumber = (value: string) => !isNaN(parseFloat(value));

  useEffect(() => {
    // Default koordinater
    const defaultLatitude = 51.505;
    const defaultLongitude = -0.09;

    // Parse latitude och longitude detta är för att setView vill ha nummer istället för string
    const parsedLatitude = isValidNumber(latitude)
      ? parseFloat(latitude)
      : defaultLatitude;
    const parsedLongitude = isValidNumber(longitude)
      ? parseFloat(longitude)
      : defaultLongitude;

    // Skapa en karta med Leaflet när komponenten har monterats
    const map = L.map("map").setView([parsedLatitude, parsedLongitude], 13);

    if (option === "option1" || option === null || option === "") {
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);
    } else if (option === "option2") {
      L.tileLayer(
        `https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${apiKey}`,
        {
          attribution:
            '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 22,
        }
      ).addTo(map);

      // Denna ska bara lägga till marker med lon, lat som kommer från backend
    }
    if (backendMarker) {
      backendMarker.forEach((marker) => {
        L.marker([marker.lat, marker.lon])
          .addTo(map)
          .bindPopup(marker.activity);
      });
    }

    // Återställ kartan när komponenten rensas från DOM
    return () => {
      map.remove();
    };
  }, [latitude, longitude, option, backendMarker]);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
};

export default Maps2;
