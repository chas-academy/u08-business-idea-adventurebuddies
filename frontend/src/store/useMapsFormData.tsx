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

// Skapa din zustand-store med rätt typ
export const useMapsFormData = create<MapsFormDataState>((set) => ({
  userLocation: {
    locationData: {
      lat: "",
      lon: "",
    },
  },
  option: "option1",

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

  updateOption: (updateOption: string) => set({ option: updateOption }),
}));
