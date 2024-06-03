import FilterDropdown from "../../components/filterDropdown/FilterDropdown";
import MapPage from "../map/MapPage";
import React, { useEffect, useState } from "react";
import SearchBar from "../map/SearchBar";
import { IEvent } from "../../../../backend/src/interfaces/IEvent";
import EventList from "../../components/eventContent/EventList";

const HomePage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [query, setQuery] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
      const response = await fetch(`https://u08-business-idea-adventurebuddies.onrender.com/api/events`);
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleFilter = async (queryParams: Record<string, string>) => {
    try {
      const urlParams = new URLSearchParams(queryParams).toString();
      const response = await fetch(`https://u08-business-idea-adventurebuddies.onrender.com/api/events/query?${urlParams}`);
      if (response.ok) {
        const { events, query } = await response.json();
        console.log(events)
        console.log(query)
        setFilteredEvents(events);
        setQuery(query);
      } else {
        const responseText = await response.text();
        console.error('Error fetching filtered events:', response.status, response.statusText);
        console.error('Response data:', responseText);
      }
    } catch (error) {
      console.error("Error fetching filtered events:", error);
    }
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
    <SearchBar />
    <FilterDropdown events={events} onFilter={handleFilter} />
    <EventList events={events} filteredEvents={filteredEvents} />
      {/* <>
        <MapPage />
      </> */}
    </div>
  );
};

export default HomePage;
