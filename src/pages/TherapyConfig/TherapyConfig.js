import React, { useEffect, useState, useCallback } from "react";

import ilustracion from "../../assets/svg/ilustacion-inicio.svg";

import { Image, Button } from "semantic-ui-react";

import { Link } from "react-router-dom";

import { fetchSessionData } from "../../utils/fetchSessionData";

import "./TherapyConfig.scss";

export default function TherapyConfig(props) {
  const { userInfo, setNotificationHide } = props;

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [flag, setFlag] = useState(true);

  const fetchList = useCallback(async () => {
    setNotificationHide(false);
    await fetchSessionData(userInfo, setSessionList, setFlag, false);
  }, [userInfo]);

  useEffect(() => {
    fetchList();
  }, [userInfo]);

  useEffect(() => {
    setCalendarEvents(sessionList.filter((x) => x.status === "Agendada"));
  }, [flag]);

  return (
    <div className="latestUpdate">
      <div className="imageFloat">
        <Image className="imageLatest" src={ilustracion} />
      </div>
      <div className="container">
        <h1 className="titleLatest">Información General</h1>
      </div>
      {calendarEvents.length > 0 ? (
        <SessionAvailable calendarEvents={calendarEvents} userInfo={userInfo} />
      ) : (
        <NoSessionAvailable userInfo={userInfo} />
      )}
    </div>
  );
}

function SessionAvailable(props) {
  const { calendarEvents, userInfo } = props;

  const [realTime, setRealTime] = useState(null);

  const { title, start, end, id } = calendarEvents[0];

  /**
   * TimeLapse
   */

  const dateInit = new Date(start);
  const dateEnd = new Date(end);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = dateInit.toLocaleDateString("es-ES", options);

  const time = {
    init: { hour: dateInit.getHours(), minutes: dateInit.getMinutes() },
    fin: { hour: dateEnd.getHours(), minutes: dateEnd.getMinutes() },
  };

  /**
   * Time comparison
   */

  useEffect(() => {
    const actualDate = new Date();

    if (actualDate >= dateInit && actualDate <= dateEnd) {
      setRealTime(false);
    } else {
      setRealTime(true);
    }
  }, [dateInit, dateEnd]);

  return (
    <div className="initSessionContainer">
      <h1 className="text">
        Próxima Sesión: <a className="infoText"> {date} </a>
      </h1>
      <h1 className="text">
        Horario:{" "}
        <a className="infoText">
          {" "}
          {`${time.init.hour}:${time.init.minutes} hrs - ${time.fin.hour}:${time.fin.minutes} hrs`}{" "}
        </a>
      </h1>
      <h1 className="text">
        {userInfo.role === "psicologo" ? "Paciente" : "Psicólogo"}:{" "}
        <a className="infoText"> {title} </a>
      </h1>
      <h1 className="text">
        ID: <a className="infoText"> {id} </a>
      </h1>
      <p />
      <p />
      <p />

      <div className="buttonIn">
        <Button disabled={realTime}>
          <Link className="link" to={`/Therapy/${id}`}>
            Ingresar a Sesión
          </Link>
        </Button>
      </div>
    </div>
  );
}

function NoSessionAvailable(props) {
  const { userInfo } = props;
  return (
    <div className="initSessionContainer">
      <p className="text">
        Por el momento no cuentas con ninguna sesión agendada...{" "}
      </p>
      <h1 className="text">
        {userInfo.role === "psicologo"
          ? "Si quieres hacerlo,"
          : "Ponte en contacto con tu psicólogo y agenda una,"}
        <Link
          to={userInfo.role === "psicologo" ? "/Historial" : "/MensajesConfig"}
        >
          <div className="infoText"> {"presiona aquí."} </div>
        </Link>
      </h1>
    </div>
  );
}
