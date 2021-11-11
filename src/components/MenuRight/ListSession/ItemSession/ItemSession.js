import React, { useState, useEffect } from "react";
import { Label, Divider, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { removeTherapySession } from "../../../../utils/Api";

import "./ItemSession.scss";

export default function ItemSession(props) {
  const { calendarEvents, setAddSessionRefresh } = props;

  const [itemInfo, setItemInfo] = useState({});

  //   console.log(calendarEvents);

  useEffect(() => {
    if (calendarEvents) {
      setItemInfo(getDate(calendarEvents));
    }
  }, [calendarEvents]);

  return (
    <div>
      {itemInfo && (
        <Link to={`/patientSessionDescription/${calendarEvents.id}`}>
          <div className="itemSessionP">
            <div className="joinP">
              <Label className="labelItemDateP">
                {itemInfo.month} <Divider className="dividerDateP" />
                <p className="boldDateP">{itemInfo.day}</p>
              </Label>
              <Label className="labelItemInfoP">
                Duración: <p className="boldP">{itemInfo.duration}</p>
              </Label>
              <div className="divierInfoP" />
              <Label className="labelItemInfoP">
                Horario: <p className="boldP">{itemInfo.schedule}</p>
              </Label>
            </div>
          </div>
        </Link>
      )}
      <div className="divierJoinP" />
    </div>
  );
}

const getDate = (session) => {
  //   const timeInit = session.start.seconds;
  const myDateInit = new Date(session.start);

  //   const timeEnd = session.end.seconds;
  const myDateEnd = new Date(session.end);

  const duration = msToHMS(myDateEnd.getTime() - myDateInit.getTime());

  return {
    month: myDateInit.toLocaleDateString("es-ES", { month: "short" }),
    day: myDateInit.toLocaleDateString("es-ES", { day: "numeric" }),
    duration: `${duration.hours}hr${
      duration.minutes > 0 ? " " + duration.minutes + "m" : ""
    }`,
    schedule: `${myDateInit.getHours()}:${
      myDateInit.getMinutes().toString().length == 1
        ? "0" + myDateInit.getMinutes()
        : myDateInit.getMinutes()
    } a ${myDateEnd.getHours()}:${
      myDateEnd.getMinutes().toString().length == 1
        ? "0" + myDateEnd.getMinutes()
        : myDateEnd.getMinutes()
    }`,
  };
};

function msToHMS(ms) {
  let seconds = ms / 1000;
  const hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = parseInt(seconds / 60);
  seconds = seconds % 60;
  return { hours: hours, minutes: minutes, seconds: seconds };
}
