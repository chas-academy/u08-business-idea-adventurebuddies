import React, { useEffect, useState } from "react";
import Tab from "../tabs/Tab";
import Tabs from "../tabs/Tabs";
import { TabsProvider } from "../tabs/TabsContext";

interface Event {
  _id: string;
  activity: string;
  location: string;
  start_time: string;
  // Will add more event details here later
}

const UserEvents: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if (!userId || !token) {
          throw new Error("User ID or token not found in local storage");
        }
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}/events`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data:", data);

        if (data && data.createdEvents) {
          const currentTime = new Date();
          const upcomingCreatedEvents = data.createdEvents.filter(
            (event: Event) => new Date(event.start_time) > currentTime
          );

          setUpcomingEvents(upcomingCreatedEvents);
          setCreatedEvents(data.createdEvents);
        } else {
          console.error("Events data not found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [activeTabIndex]);

  return (
    <TabsProvider>
      <Tabs>
        <Tab
          tabLabel="Upcoming Events"
          index={0}
          setActiveTabIndex={setActiveTabIndex}
        >
          <div>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event._id}>
                  <h3>{event.activity}</h3>
                  <p>{event.location}</p>
                  <p>{new Date(event.start_time).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No upcoming events found</p>
            )}
          </div>
        </Tab>
        <Tab
          tabLabel="Mina Events"
          index={1}
          setActiveTabIndex={setActiveTabIndex}
        >
          <div>
            {createdEvents.length > 0 ? (
              createdEvents.map((event) => (
                <div key={event._id}>
                  <h3>{event.activity}</h3>
                  <p>{event.location}</p>
                  <p>{new Date(event.start_time).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No events found</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </TabsProvider>
  );
};

export default UserEvents;
