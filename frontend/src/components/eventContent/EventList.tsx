import EventListItem from "./EventListItem";
import { IEvent } from "../../../../backend/src/interfaces/IEvent";
import React from "react";

interface EventListProps {
    events: IEvent[];
    filteredEvents: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events, filteredEvents }) => {
    if (!events || events.length === 0) {
        return <div>No events found</div>;
    }

    return (
        <div className="flex flex-col md:items-center max-w-80 md:p-5">
            {filteredEvents && filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => <EventListItem key={index} event={event}/>)
            ) : (
                events.map((event, index) => <EventListItem key={index} event={event}/>)
            )}
        </div>
    )
}

export default EventList;