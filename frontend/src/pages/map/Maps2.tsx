import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapsFormData } from "../../store/useMapsFormData";
import { useEventLatitude } from "../../store/useIEventLatitude";
import React from "react";
// import { CartoDB } from "ol/source";

const Maps2 = () => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  // ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ
  // Skicka eventform till backend
  // Gör en fetch till backend och mappa i backend och skicka tillbaka lon,lat
  // och gör sedan så att du får med aktivitet från backend

  // const [eventMarker, setEventMarker] = useState<
  //   { lat: number; lon: number }[]
  // >([]);

  // Denna får ut värdet från storen till denna fil nu kan du jobba vidare på för att försöka trigga en pil för dessa kordinater
  // const { latitudeEvent } = useEventLatitude();
  // useEffect(() => {
  //   setEventMarker((prevMarkers) => [
  //     ...prevMarkers,
  //     {
  //       lat: parseFloat(latitudeEvent.lat),
  //       lon: parseFloat(latitudeEvent.lon),
  //     },
  //   ]);
  //   console.log(eventMarker);
  // }, []);

  // ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ

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

    // Parse latitude och longitude
    const parsedLatitude = isValidNumber(latitude)
      ? parseFloat(latitude)
      : defaultLatitude;
    const parsedLongitude = isValidNumber(longitude)
      ? parseFloat(longitude)
      : defaultLongitude;

    // Skapa en karta med Leaflet när komponenten har monterats
    const map = L.map("map").setView([parsedLatitude, parsedLongitude], 13);

    // const eventLat = latitudeEvent.lat;
    // const eventLon = latitudeEvent.lon;

    // const eventMarkerlat: number = parseFloat(latitudeEvent.lat);
    // const eventMarkerlon: number = parseFloat(latitudeEvent.lon);

    if (option === "option1") {
      const CartoDB_Voyager = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);
      console.log("CartoDB_Voyager tile layer added:", CartoDB_Voyager);
    } else if (option === "option2") {
      const Thunderforest_SpinalMap = L.tileLayer(
        `https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=93300a9709214326825865733ab161ce`,
        {
          attribution:
            '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          // apikey: "93300a9709214326825865733ab161ce",
          maxZoom: 22,
        }
      ).addTo(map);
      console.log(
        "Thunderforest_SpinalMap tile layer added:",
        Thunderforest_SpinalMap
      );

      // Denna ska bara lägga till marker med lon, lat som kommer från sustansstoren från event form
    }
    // if (!isNaN(eventMarkerlat) && !isNaN(eventMarkerlon)) {
    //   eventMarker.forEach((marker) => {
    //     L.marker([marker.lat, marker.lon]).addTo(map);
    //   });

    //   // const marker = L.marker([latitudeEvent.lat, latitudeEvent.lon]);
    //   // marker.addTo(map);
    // }

    // Återställ kartan när komponenten rensas från DOM
    return () => {
      map.remove();
    };
  }, [latitude, longitude, option]);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
};

export default Maps2;
