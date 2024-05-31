// import { create } from "zustand";

// interface LatitudeIEvent {
//   lat: string;
//   lon: string;
// }

// interface EventLatitudeState {
//   latitudeEvent: LatitudeIEvent;
//   updateLatitudeIEvent: (newLat: string, newLon: string) => void;
// }

// export const useEventLatitude = create<EventLatitudeState>((set) => ({
//   latitudeEvent: {
//     lat: "",
//     lon: "",
//   },

//   updateLatitudeIEvent: (newLat: string, newLon: string) => {
//     set((state) => ({
//       latitudeEvent: {
//         ...state.latitudeEvent,
//         lat: newLat,
//         lon: newLon,
//       },
//     }));
//   },
// }));
