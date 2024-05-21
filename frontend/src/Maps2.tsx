import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Det du ska göra nu är att försöka få in propps in i maps2 den ska innehålla
// lon, lat och option long lat ska uppdatera usestase med de du söker på och option
// ska kunna byta karta till eldkartan eller tillbaka

function Maps2({ locationData, option }) {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [optionValue, setOptionValue] = useState<string>("option1");
  // console.log("Option", option);
  console.log("Option2:", optionValue);

  useEffect(() => {
    setOptionValue(option);
  }, [option]);

  useEffect(() => {
    console.log("Heeeelo");
    if (locationData && locationData.lat && locationData.lon) {
      console.log("Detta är long", locationData.lon);
      setLatitude(locationData.lat);
      setLongitude(locationData.lon);
      // console.log("lll", locationData.locationData.lat);
    }
  }, [locationData]);

  //   Denna Hämtar geolacation och sätter in Lat och Long i usestate
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

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
}

export default Maps2;
