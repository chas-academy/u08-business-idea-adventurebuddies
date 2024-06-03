import React from 'react';
import { IEvent } from '../../../../backend/src/interfaces/IEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@fortawesome/free-solid-svg-icons';
import { faFutbol } from '@fortawesome/free-regular-svg-icons';

interface EventListItemProps {
  event: IEvent;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
  const getActivityIcon = () => {
    switch (event.activity) {
      case 'Brännboll':
        return <FontAwesomeIcon style={{ color: '#41B082' }} size="2xl" icon={faFutbol} />;
      case 'Volleyboll':
        return <FontAwesomeIcon style={{ color: '#41B082' }} size="2xl" icon={faVolleyball} />;
      case 'Golf':
        return <FontAwesomeIcon style={{ color: '#41B082' }} size="2xl" icon={faGolfBallTee} />;
      default:
        return null;
    }
  };

  const formattedDate = new Intl.DateTimeFormat('sv-SV', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(event.start_time.toString()));

  const formattedTime = new Intl.DateTimeFormat('sv-SV', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(event.start_time.toString()));

  return (
    <div className="flex flex-row justify-between px-5 h-20 w-96 m-1.5 border border-borderShade rounded-full shadow-custom">
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
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faCalendarDays} />
        <p className="pl-2">{formattedDate}</p>
      </div>
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faClock} />
        <p className="pl-2">{formattedTime}</p>
      </div>
    </div>
  </div>
  )
}

export default EventListItem;

// import { useState, useEffect } from "react";
// import { IEvent2 } from "../../pages/CreateEventPage/CreateEventPage.interface";
// import React from "react";
// import {
//   faLocationDot,
//   faCalendarDays,
//   faClock,
//   faVolleyball,
//   faFootball,
//   faBasketball,
//   faBaseball,
//   faTableTennisPaddleBall,
//   faDumbbell,
//   faBaseballBatBall,
//   faBowlingBall,
//   faGolfBallTee,
// } from "@fortawesome/free-solid-svg-icons";
// import { faFutbol } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// interface EventListItemProps {
//   label: string;
//   activityIcon:
//     | "faVolleyball"
//     | "faFootball"
//     | "faBasketball"
//     | "faBaseball"
//     | "faTableTennisPaddleBall"
//     | "faDumbbell"
//     | "faBaseballBatBall"
//     | "faBowlingBall"
//     | "faGolfBallTee"
//     | "faFutbol";
//   infoIcon?: "faLocationDot" | "faCalendarDays" | "faClock";
//   location: string;
//   date: Date;
//   time: number;
// }
// //Ska vi har två icons? Tänkte på de gröna

// const EventListItem: React.FC<EventListItemProps> = ({
//   label,
//   activityIcon,
//   infoIcon,
//   location,
//   date,
//   time,
// }) => {
//   const [data, setData] = useState<IEvent2 | null>(null);
//   const [activity, setActivity] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const EVENT_ID = "66585ef4a230d0661ecb3ed3";
//   const API_URL = `https://u08-business-idea-adventurebuddies.onrender.com/api/events/${EVENT_ID}`;

//   useEffect(() => {
//     const hamtaBackend = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const contentType = response.headers.get("content-type");

//         if (contentType && contentType.indexOf("application/json") !== -1) {
//           const data = await response.json();
//           console.log(data);
//           setData(data as IEvent2);
//           setActivity(data.activity);
//           console.log(activity);
//           console.log(data.age);
//         } else {
//           const text = await response.text();
//           console.error("Server returned non-JSON response:", text);
//           throw new Error("Server returned non-JSON response");
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     hamtaBackend();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const formatedDate = new Date(data.start_time).toLocaleString("sv-SV", {
//     month: "short",
//     day: "2-digit",
//     year: "numeric",
//   });
//   const formatedTime = new Date(data.start_time).toLocaleString("sv-SV", {
//     hour: "numeric",
//     minute: "numeric",
//   });

//   const getIcon = (activity: string ) => {
//     switch (activity) {
//       case "Brännboll":
//         return (
//           <>
//             <FontAwesomeIcon style={{ color: "#41B082" }} size="2xl" icon={faFutbol} />
//           </>
//         );
//       case "Volleyboll":
//         return (
//           <>
//             <FontAwesomeIcon style={{ color: "#41B082" }} size="2xl" icon={faVolleyball} />
//           </>
//         );
//       case "Golf":
//         return (
//           <>
//             <FontAwesomeIcon style={{ color: "#41B082" }} size="2xl" icon={faGolfBallTee} />
//           </>
//         );
//         default:
//           return null;
//     }
//   };

//   return (
//     <div className="flex flex-row justify-between px-5 h-20 w-96 m-1.5 border border-borderShade rounded-full shadow-custom ">
//       <div className="flex flex-row items-center">
//         {/* <FontAwesomeIcon style={{ color: "#41B082" }} size="2xl" icon={faVolleyball} /> */}
//         {activity && getIcon(activity)}
//         <div className="text-start pl-3">
//           <h2>{data.activity}</h2>
//           <p className="text-textGray">{data.participantsMax}</p>
//         </div>
//       </div>
//       <div className="flex flex-col justify-center text-xs leading-relaxed ">
//         <div className="flex flex-row items-center">
//           <FontAwesomeIcon icon={faLocationDot} />
//           <p className="pl-2">{data.location}</p>
//         </div>
//         <div className="flex flex-row items-center">
//           <FontAwesomeIcon icon={faCalendarDays} />
//           <p className="pl-2"> {formatedDate} </p>
//         </div>
//         <div className="flex flex-row items-center">
//           <FontAwesomeIcon icon={faClock} />
//           <p className="pl-2">{formatedTime}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventListItem;

//<FontAwesomeIcon icon={faPeopleGroup} />
//<FontAwesomeIcon icon={faMarsAndVenus} />
//<FontAwesomeIcon icon={faHandHoldingDollar} />
// <FontAwesomeIcon icon={faPersonShelter} />
// <FontAwesomeIcon icon={faLanguage} />
// <FontAwesomeIcon icon={faSeedling} />
// <FontAwesomeIcon icon="fa-solid fa-people-roof" />
