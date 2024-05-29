// import { create } from "zustand";
// import { IEvent2 } from "../../../shared/interfaces/IEvents2";

// interface LatitudeIEvent {
//   lat: string;
//   lon: string;
// }

// interface EventLatitudeState {
//   latitudeEvent: LatitudeIEvent;
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
