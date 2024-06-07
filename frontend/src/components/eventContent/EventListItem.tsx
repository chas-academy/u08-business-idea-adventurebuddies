import React from "react";
import { IEvent } from "../../../../backend/src/interfaces/IEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faClock,
  faVolleyball,
  // faFootball,
  // faBasketball,
  // faBaseball,
  // faTableTennisPaddleBall,
  // faDumbbell,
  // faBaseballBatBall,
  // faBowlingBall,
  faGolfBallTee,
} from "@fortawesome/free-solid-svg-icons";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";


interface EventListItemProps {
  event: IEvent;
  eventId: Object;
  isAuthenticated: boolean;
}

const EventListItem: React.FC<EventListItemProps> = ({
  event,
  eventId,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  const dateObject = new Date(Math.floor(new Date(event.start_time).getTime()) * 1000);

  const getActivityIcon = () => {
    switch (event.activity) {
      case "Brännboll":
        return (
          <FontAwesomeIcon
            style={{ color: "#41B082" }}
            size="2xl"
            icon={faFutbol}
          />
        );
      case "Volleyboll":
        return (
          <FontAwesomeIcon
            style={{ color: "#41B082" }}
            size="2xl"
            icon={faVolleyball}
          />
        );
      case "Golf":
        return (
          <FontAwesomeIcon
            style={{ color: "#41B082" }}
            size="2xl"
            icon={faGolfBallTee}
          />
        );
      default:
        return null;
    }
  };

  const formattedDate = dateObject.toLocaleDateString("sv-SV", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = dateObject.toLocaleTimeString("sv-SV", {
    hour: "numeric",
    minute: "numeric",
  });

  const handleEventItemClick = (eventId: string) => {
    console.log(eventId);
    navigate("/eventInfo", { 
      state: {
        eventId: eventId,
      }
    });
  }

  return (
    <div id={eventId.toString()} onClick={() => handleEventItemClick(eventId.toString())} className="flex flex-row justify-between px-5 h-20 min-w-72 max-w-80 m-1.5 border border-borderShade rounded-full shadow-custom">
      <div className="flex flex-row items-center">
        {getActivityIcon()}
        <div className="text-start pl-3">
          <h2>{event.activity}</h2>
          <p className="text-textGray">{event.participantsMax} deltagare</p>
        </div>
      </div>
      <div className="flex flex-col justify-center text-xs leading-relaxed">
        <div className="flex flex-row items-center">
          <FontAwesomeIcon icon={faLocationDot} />
          <p className="pl-2">{event.location}</p>
        </div>

        {isAuthenticated && (
          <>
            <div className="flex flex-row items-center">
              <FontAwesomeIcon icon={faCalendarDays} />
              <p className="pl-2">{formattedDate}</p>
            </div>
            <div className="flex flex-row items-center">
              <FontAwesomeIcon icon={faClock} />
              <p className="pl-2">{formattedTime}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventListItem;

