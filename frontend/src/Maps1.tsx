import React, { useState, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";

function Maps1() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Get user's geolocation when the component mounts
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // If successful, save the position in state
        setPosition(position.coords);
        console.log(position);
      },
      (error) => {
        // If geolocation fetch fails, handle the error
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (position) {
      const { latitude, longitude } = position;

      const osmLayer = new TileLayer({
        preload: Infinity,
        source: new OSM(),
      });

      // Create a vector source and layer for the marker
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      const map = new Map({
        target: "map",
        layers: [osmLayer, vectorLayer],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 10,
        }),
      });

      // Create a marker at the user's location
      const marker = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      });

      // Add the marker to the vector source
      vectorSource.addFeature(marker);

      // Style the marker
      marker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://openlayers.org/en/latest/examples/data/icon.png", // URL to your marker icon
          }),
        })
      );

      return () => map.setTarget(undefined);
    }
  }, [position]);

  return (
    <div
      style={{ height: "500px", width: "100%" }}
      id="map"
      className="map-container"
    />
  );
}

export default Maps1;
