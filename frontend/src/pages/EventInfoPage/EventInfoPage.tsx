import React, { useEffect, useState } from "react";

import { IEvent } from "../../../../backend/src/interfaces/IEvent";
import Button from "../../components/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationArrow,
  faPeopleRobbery,
} from "@fortawesome/free-solid-svg-icons";
import Maps2 from "../map/Maps2";

const EventInfoPage: React.FC = () => {
  const [data, setData] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("id");
  const userToken = localStorage.getItem("token");
  const EVENT_ID = "6658ad0bef0ddbeb30deab11";
  const API_URL = `https://u08-business-idea-adventurebuddies.onrender.com/api/events/${EVENT_ID}`;

  const API_URL_ATTEND = `https://u08-business-idea-adventurebuddies.onrender.com/api/events/${userId}/attend/${EVENT_ID}`;

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    const getBackend = async () => {
      try {
        const response = await fetch(API_URL);
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          setData(data as IEvent);
        } else {
          const text = await response.text();
          console.error("Server returned non-JSON response:", text);
          throw new Error("Server returned non-JSON response");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getBackend();
  }, [API_URL]);

  const handleAttendEvent = async () => {
    if (!isAuthenticated) {
      console.error("User is not authenticated");

      return;
    }

    try {
      const response = await fetch(API_URL_ATTEND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          eventId: EVENT_ID,
          userId: userId,
        }),
      });

      if (response.ok) {
        console.log("Attending event successful!");
        
      } else {
        console.error("Failed to attend event:", response.statusText);
       
      }
    } catch (error) {
      console.error("An error occurred while attending event:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formatedDate = new Date(data.start_time).toLocaleString("sv-SV", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const formatedTime = new Date(data.start_time).toLocaleString("sv-SV", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="">
      <div className="font-bold text-5xl py-10 md:none">
        {data.activity} {data.location}
      </div>

      <div className="lg:grid lg:grid-cols-2 ">
        {data ? (
          <div className="glass-container text-left p-5 mx-4  ">
            <div className=" flex justify-between items-baseline">
              <div className="">
                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Aktivitet:</h2>
                  <p>{data.activity}</p>
                </div>

                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Plats:</h2>
                  <p>
                    {data.location}, {data.venue}
                  </p>
                </div>

                <div className="flex  space-x-1 py-3">
                  <h2 className="font-bold">Tid och datum:</h2>
                  <p>{formatedDate}</p>
                </div>
                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Utrustning:</h2>
                  <p>{data.equipment}</p>
                </div>
                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Min/Max deltagare:</h2>
                  <p>
                    {data.participantsMin} - {data.participantsMax}
                  </p>
                </div>
                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Anmälda deltagare:</h2>
                  <p>
                    {data.totalParticipant}/{data.participantsMax}
                  </p>
                </div>
                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Ålder:</h2>
                  <p>{data.age}</p>
                </div>
                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Nivå:</h2>
                  <p>{data.experience}</p>
                </div>
                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Info:</h2>
                  <p>{data.message}</p>
                </div>
                <div className="flex space-x-1 py-3">
                  <h2 className="font-bold">Kön:</h2>
                  <p>{data.gender}</p>
                </div>
              </div>

              <div className="mx-5">
                <p className="font-semibold underline text-nowrap">
                  {data.user_id?.userName}
                </p>
                <img className="h-10 w-10  rounded-full border-4 bg-halfDarkpurple  "></img>
              </div>
            </div>

            <div className="  ">
              <div className="grid grid-cols-2  rounded border border-primaryColor shadow-custom px-2 my-2 ">
                <div className="flex space-x-1 py-3 ">
                  <FontAwesomeIcon size="xl" icon={faClock} />
                  <h2 className="font-bold ">Start:</h2>
                  <p>{formatedTime}</p>
                </div>

                <div className="flex justify-end space-x-1 py-3 ">
                  <FontAwesomeIcon size="xl" icon={faLocationArrow} />
                  <h2 className="font-bold ">Plats:</h2>
                  <p>{data.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 rounded border border-primaryColor shadow-custom px-2 mb-10 ">
                <div className="flex space-x-1 py-3 ">
                  <FontAwesomeIcon size="xl" icon={faPeopleRobbery} />
                  <h2 className="font-bold ">Anmälda deltagare:</h2>
                </div>
                <div className="flex justify-end py-2 text-2xl">
                  <p>
                    {data.totalParticipant}/{data.participantsMax}
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex-wrap flex justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onclick}
                icon="faBookmark"
                size="small"
              >
                Spara Event
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleAttendEvent}
                icon="faCirclePlus"
                size="small"
              >
                Kommer
              </Button>
            </div>
          </div>
        ) : null}
        <div className="invisible lg:visible">
          <Maps2 />
        </div>
      </div>
    </div>
  );
};

export default EventInfoPage;
