import FilterDropdown from "../../components/filterDropdown/FilterDropdown";
import MapPage from "../map/MapPage";
import React, { useEffect, useState } from "react";
import SearchBar from "../map/SearchBar";
import { IEvent } from "../../../../backend/src/interfaces/IEvent";
import Maps2 from "../map/Maps2";

const HomePage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const urlParams = new URLSearchParams(window.location.search);
        // const url = `http://localhost:3000/api/events/query?${urlParams.toString()}`;
        const response = await fetch("http://localhost:3000/api/events");
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);

        // if (data) {
        //   setEvents(data);
        // } else {
        //   console.error('Backend returned empty response');
        // }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleFilter = (filteredEventsUrl: string) => {
    const fetchFilteredEvents = async () => {
      try {
        const decodedUrl = decodeURIComponent(filteredEventsUrl);
        const response = await fetch(decodedUrl);
        console.log("filtered events response:", response);
        if (response.ok) {
          const data = await response.json();
          setFilteredEvents(data);
        } else {
          const responseText = await response.text();
          console.error(
            "Error fetching filtered events:",
            response.status,
            response.statusText
          );
          console.error("Response data:", responseText);
        }
      } catch (error) {
        console.error("Error fetching filtered events:", error);
      }
    };

    fetchFilteredEvents();
  };

  return (
    <div className="h-screen">
      <Maps2 />
      <FilterDropdown events={events} onFilter={handleFilter} />
      {/* <>
        <MapPage />
      </> */}
    </div>
  );
};

export default HomePage;
