import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";

function Maps1() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position.coords);
      },
      (error) => {
        console.log("Could not get your Location: ", error);
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

      const map = new Map({
        target: "map",
        layers: [osmLayer],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 7,
        }),
      });
      return () => map.setTarget();
    }
  }, [position]);

  return (
    <div
      style={{ height: "300px", width: "100%" }}
      id="map"
      className="map-container"
    />
  );
}

export default Maps1;

// import React, { useState, useEffect, useRef } from "react";
// import { Map, View } from "ol";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import "ol/ol.css";
// import { fromLonLat } from "ol/proj";

// function Maps1() {
//   const [position, setPosition] = useState(null);

//   useEffect(() => {
//     // Hämta användarens geolocation när komponenten renderas
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         // Om hämtningen lyckas, spara positionen i state
//         setPosition(position.coords);
//       },
//       (error) => {
//         // Om hämtningen misslyckas, hantera felet här
//         console.error("Error getting geolocation:", error);
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (position) {
//       const { latitude, longitude } = position;

//       const osmLayer = new TileLayer({
//         preload: Infinity,
//         source: new OSM(),
//       });

//       const map = new Map({
//         target: "map",
//         layers: [osmLayer],
//         view: new View({
//           center: fromLonLat([longitude, latitude]),
//           zoom: 3,
//         }),
//       });

//       return () => map.setTarget();
//     }
//   }, [position]);

//   return (
//     <div
//       style={{ height: "300px", width: "100%" }}
//       id="map"
//       className="map-container"
//     />
//   );
// }

// export default Maps1;
