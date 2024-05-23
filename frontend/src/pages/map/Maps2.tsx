import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapsFormData } from "../../store/useMapsFormData";

// type state2 = {
//   lat: string;
//   lon: string;
// };

// Detta var propsen som skickaed förut nu ska du ju få dom genom store istället
// function Maps2({ locationData, option }) {
// Lon Lat från store
const Maps2 = () => {
  const { userLocation } = useMapsFormData((state) => ({
    userLocation: state.userLocation.locationData,
  }));
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [optionValue, setOptionValue] = useState<string>("option1");
  // console.log("Option", option);
  console.log("Option2:", optionValue);

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lon) {
      const { lat, lon } = userLocation;
      console.log("Latitude Lennart:", lat);
      console.log("Longitude:", lon);
      setLatitude(lat);
      setLongitude(lon);
    }
  }, [userLocation, latitude, longitude]);

  // Option från store

  const option = useMapsFormData((state) => state.option);

  useEffect(() => {
    if (option) {
      console.log("LEEEEEEEEEEEEEEEEENART", option);
    }
  });

  useEffect(() => {
    setOptionValue(option);
  }, [option]);

  // useEffect(() => {
  //   console.log("Heeeelo");
  //   if (locationData && locationData.lat && locationData.lon) {
  //     console.log("Detta är long", locationData.lon);
  //     setLatitude(locationData.lat);
  //     setLongitude(locationData.lon);
  //     // console.log("lll", locationData.locationData.lat);
  //   }
  // }, [locationData]);

  //   Denna Hämtar geolacation och sätter in Lat och Long i usestate
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    });
  };
  console.log("rrrrrrrrrr", latitude);
  console.log("eeeeeeeeee", longitude);

  useEffect(() => {
    getUserLocation();
  }, []);
  useEffect(() => {
    // getUserLocation();
    // console.log("Uppdateras", latitude);
    // Skapa en karta med Leaflet när komponenten har monterats
    const map = L.map("map").setView([latitude, longitude], 13);

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
    } else if (option === "option2") {
      const Thunderforest_SpinalMap = L.tileLayer(
        "https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}",
        {
          attribution:
            '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          apikey: "93300a9709214326825865733ab161ce",
          maxZoom: 22,
        }
      ).addTo(map);
    }

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
