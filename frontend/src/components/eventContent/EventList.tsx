import { IEvent } from "../../utils/IEvents";
import EventListItem from "./EventListItem";

import React from "react";

interface EventListProps {
  events: IEvent[];
  filteredEvents?: IEvent[];
  isAuthenticated: boolean;
}

const EventList: React.FC<EventListProps> = ({
  events,
  filteredEvents,
  isAuthenticated,
}) => {
  if (!events || events.length === 0) {
    return <div>No events found</div>;
  }

  return (
    <div className="flex flex-col md:items-center max-w-80 md:p-5">
      {filteredEvents && filteredEvents.length > 0
        ? filteredEvents.map((event, index) => (
            <EventListItem
              key={index}
              event={event}
              eventId={event._id}
              isAuthenticated={isAuthenticated}
            />
          ))
        : events.map((event, index) => (
            <EventListItem
              key={index}
              event={event}
              eventId={event._id}
              isAuthenticated={isAuthenticated}
            />
          ))}
    </div>
  );
};

export default EventList;
