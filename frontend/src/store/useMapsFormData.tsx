import { create } from "zustand";

// Typdefinitioner
interface LocationData {
  lat: string;
  lon: string;
}

interface UserLocation {
  locationData: LocationData;
}

interface MapsFormDataState {
  userLocation: UserLocation;
  option: string;
  updateUserLocation: (lat: string, lon: string) => void;
  updateOption: (updateOption: string) => void;
}

// Detta är Zustand storen
export const useMapsFormData = create<MapsFormDataState>((set) => ({
  userLocation: {
    locationData: {
      lat: "",
      lon: "",
    },
  },
  option: "",

  // Detta är funktionen för att uppdatera lat,lon i storen
  updateUserLocation: (lat: string, lon: string) =>
    set((state) => ({
      userLocation: {
        ...state.userLocation,
        locationData: {
          lat,
          lon,
        },
      },
    })),

  // Detta är funktionen för att uppdatera Option i Storen
  updateOption: (updateOption: string) => set({ option: updateOption }),
}));
