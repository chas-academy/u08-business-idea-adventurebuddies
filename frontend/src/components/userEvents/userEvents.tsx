import React, { useEffect, useState } from "react";
import Tab from "../tabs/Tab";
import Tabs from "../tabs/Tabs";
import { TabsProvider } from "../tabs/TabsContext";

interface Event {
  _id: string;
  activity: string;
  location: string;
  start_time: number;
}

const UserEvents: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if (!userId || !token) {
          throw new Error("User ID or token not found in local storage");
        }
        const response = await fetch(
          `https://u08-business-idea-adventurebuddies.onrender.com/api/users/${userId}/events`,
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
        // console.log("Data:", data);

        if (data && data.createdEvents && data.attendingEvents) {
          const currentTime = Date.now();
          // console.log("Current Time:", currentTime);
          
          const upcomingCreatedEvents = data.createdEvents.filter(
            (event: Event) => event.start_time* 1000 > currentTime
          );
          const upcomingAttendingEvents = data.attendingEvents.filter( 
            (event: Event) => event.start_time* 1000 > currentTime
          );

          // console.log("Upcoming Events:", upcomingCreatedEvents);
          // console.log("Upcoming Attending Events:", upcomingAttendingEvents);
          
          setUpcomingEvents(upcomingCreatedEvents);
          setCreatedEvents(data.createdEvents);
          setAttendingEvents(upcomingAttendingEvents);


        } else {
          console.error("Events data not found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [activeTabIndex]);

  const formatEventDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);

    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
 
    const formattedDate = date.toLocaleDateString('sv-SE', dateOptions);
    const formattedTime = date.toLocaleTimeString('sv-SE', timeOptions);

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <TabsProvider>
      <Tabs>
        <Tab
          tabLabel="Upcoming Events"
          index={0}
          setActiveTabIndex={setActiveTabIndex}
        >
          <div>
            {upcomingEvents.length + attendingEvents.length > 0 ? (
              [...upcomingEvents, ...attendingEvents].map((event) => (
                <div key={event._id}>
                  <h3>{event.activity}</h3>
                  <p>{event.location}</p>
                  <p>{formatEventDate(event.start_time)}</p>
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
                  <p>{formatEventDate(event.start_time)}</p>
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
