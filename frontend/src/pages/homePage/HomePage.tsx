import FilterDropdown from "../../components/filterDropdown/FilterDropdown";
import MapPage from "../map/MapPage";
import React, { useEffect, useState } from "react";
import SearchBar from "../map/SearchBar";

import EventList from "../../components/eventContent/EventList";
import { TabsProvider } from "../../components/tabs/TabsContext";
import Tabs from "../../components/tabs/Tabs";
import Tab from "../../components/tabs/Tab";
import { useAuth } from "../../components/header/navbar/AuthContext";
import { IEvent } from "../../utils/IEvents";

const HomePage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [query, setQuery] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [ activeTabIndex,setActiveTabIndex] = useState(0);
  const { isAuthenticated } = useAuth();
console.log(activeTabIndex);
console.log(query);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://u08-business-idea-adventurebuddies.onrender.com/api/events`
        );
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
      const response = await fetch(
        `https://u08-business-idea-adventurebuddies.onrender.com/api/events/query?${urlParams}`
      );
      if (response.ok) {
        const { events, query } = await response.json();
        console.log(events);
        console.log(query);
        setFilteredEvents(events);
        setQuery(query);
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

  return (
    <div className="h-full w-full flex flex-col justify-start items-center py-5">
      <SearchBar />
      <FilterDropdown events={events} onFilter={handleFilter} />
      {!isMobile && (
        <div className="flex md:w-4/5 w-full max-h-[80vh] justify-center overflow-hidden p-3 mt-8">
          <div className="w-3/4 max-w-screen-sm mr-8">
            <MapPage />
          </div>
          <div
            className={`overflow-y-auto overflow-hidden min-w-80 glass-container py-2 ${
              isMobile ? "flex flex-col" : "1/4"
            }`}
          >
            <h2 className="text-xl pt-3">Events</h2>
            <EventList
              events={events}
              filteredEvents={filteredEvents}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      )}
      {isMobile && (
        <TabsProvider>
          <Tabs>
            
            <Tab
            
              tabLabel="Upcoming Events"
              index={0}
              setActiveTabIndex={setActiveTabIndex}
            > 
              <EventList
                events={events}
                filteredEvents={filteredEvents}
                isAuthenticated={isAuthenticated}
              />
           </Tab>
            <Tab
            
              tabLabel="Upcoming Events"
              index={1}
              setActiveTabIndex={setActiveTabIndex}
            >
              <EventList
                events={events}
                filteredEvents={filteredEvents}
                isAuthenticated={isAuthenticated}
              />
            </Tab>
          </Tabs>
        </TabsProvider>
      )}
    </div>
  );
};

export default HomePage;
