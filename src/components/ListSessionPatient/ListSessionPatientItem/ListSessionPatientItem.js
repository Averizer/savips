import React from "react";
import { Label, Divider, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { removeTherapySession } from "../../../utils/Api";

import "./ListSessionPatientItem.scss";

export default function ListSessionPatientItem(props) {
  const { session, setAddSessionRefresh } = props;

  const { month, day, duration, schedule } = getDate(session);

  // console.log(session.data().paciente);

  return (
    <div>
      <div className="itemSession">
        <div className="join">
          <Label className="labelItemDate">
            {month} <Divider className="dividerDate" />
            <p className="boldDate">{day}</p>
          </Label>
          <Label className="labelItemInfo">
            Duración: <p className="bold">{duration}</p>
          </Label>
          <div className="divierInfo" />
          <Label className="labelItemInfo">
            Horario: <p className="bold">{schedule}</p>
          </Label>
          <div className="divierInfo" />
          <Label className="labelItemInfo">
            Estatus: <p className="bold">{session.data().estatus}</p>
          </Label>
        </div>
        {session.data().estatus == "Finalizada" && (
          <div className="joinButton">
            <Link
              to={`/patientSessionDescription/${session.id}/${
                session.data().paciente
              }`}
            >
              <Button className="buttonInfo">Detalles</Button>
            </Link>
          </div>
        )}
        {session.data().estatus == "Agendada" && (
          <div className="joinButton">
            <Button
              onClick={async () => {
                await removeTherapySession(session.id).then((res) => {
                  if (res) {
                    setAddSessionRefresh((state) => !state);
                    toast.success("Sesión cancelada correctamente");
                  }
                });
              }}
              className="joinButtonCancel"
            >
              Eliminar
            </Button>
          </div>
        )}
      </div>
      <div className="divierJoin" />
    </div>
  );
}

const getDate = (session) => {
  const timeInit = session.data().time.seconds;
  const myDateInit = new Date(timeInit * 1000);

  const timeEnd = session.data().timeEnd.seconds;
  const myDateEnd = new Date(timeEnd * 1000);

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
