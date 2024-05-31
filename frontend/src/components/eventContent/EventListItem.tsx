import React from "react";
import { faLocationDot, faCalendarDays, faClock, faVolleyball, faFootball, faBasketball, faBaseball, faTableTennisPaddleBall, faDumbbell, faBaseballBatBall, faBowlingBall, faGolfBallTee } from "@fortawesome/free-solid-svg-icons";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EventListItemProps {
  label: string;
  activityIcon: "faVolleyball";
  infoIcon?: "faLocationDot" | "faCalendarDays" | "faClock";
  location: string;
  date: Date;
  time: number;
}
//Ska vi har två icons? Tänkte på de gröna

const EventListItem: React.FC<EventListItemProps> = ({
  label,
  activityIcon,
  infoIcon,
  location,
  date,
  time,
}) => {
  const formatDate = (date: Date): string => {
    const days = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];
    const day = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    return `${day} ${dayOfMonth}/${month}`;
  };
  //   const formattedDate = formatDate(date);

  return (
    <div className="flex flex-row justify-between px-5 h-20 w-96 m-1.5 border border-borderShade rounded-full shadow-custom ">
      <div className="flex flex-row items-center">
        <FontAwesomeIcon style={{color: "#41B082"}} size="2xl" icon={faVolleyball} />
        <div className="text-start pl-3">
          <h2>Volleyboll</h2>
          <p className="text-textGray">3/10</p>
        </div>
      </div>
      <div className="flex flex-col justify-center text-xs leading-relaxed ">
        <div className="flex flex-row items-center">
          <FontAwesomeIcon icon={faLocationDot} />
          <p className="pl-2">Plats: Enskede </p>
        </div>
        <div className="flex flex-row items-center">
          <FontAwesomeIcon icon={faCalendarDays} />
          <p className="pl-2">Datum: Tors 3/5 </p>
        </div>
        <div className="flex flex-row items-center">
          <FontAwesomeIcon icon={faClock} />
          <p className="pl-2">Tid: 15:20 </p>
        </div>
      </div>
    </div>
  );
};

export default EventListItem;


//<FontAwesomeIcon icon={faPeopleGroup} /> 
//<FontAwesomeIcon icon={faMarsAndVenus} />
//<FontAwesomeIcon icon={faHandHoldingDollar} />
// <FontAwesomeIcon icon={faPersonShelter} />
// <FontAwesomeIcon icon={faLanguage} />
// <FontAwesomeIcon icon={faSeedling} />
// <FontAwesomeIcon icon="fa-solid fa-people-roof" />