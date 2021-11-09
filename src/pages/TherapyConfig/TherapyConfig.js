import React, { useEffect, useState } from "react";

import ilustracion from "../../assets/svg/ilustacion-inicio.svg";

import { Image, Button } from "semantic-ui-react";

import { Link } from "react-router-dom";

import { updateTherapySessionExpired } from "../../utils/Api";

import "./TherapyConfig.scss";

export default function TherapyConfig(props) {
  const { userInfo, calendarEvents } = props;

  //   console.log(calendarEvents);

  return (
    <div className="latestUpdate">
      <div className="imageFloat">
        <Image className="imageLatest" src={ilustracion} />
      </div>
      <div className="container">
        <h1 className="titleLatest">Información General</h1>
      </div>
      {calendarEvents.length > 0 ? (
        <SessionAvailable calendarEvents={calendarEvents} />
      ) : (
        <NoSessionAvailable />
      )}
    </div>
  );
}

function SessionAvailable(props) {
  const { calendarEvents } = props;

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
        Paciente: <a className="infoText"> {title} </a>
      </h1>
      <h1 className="text">
        ID: <a className="infoText"> {id} </a>
      </h1>
      <p />
      <p />
      <p />

      <div className="buttonIn">
        <Button disabled={realTime}>
          <Link className="link" to={"/Therapy"}>
            Ingresar a Sesión
          </Link>
        </Button>
      </div>
    </div>
  );
}

function NoSessionAvailable() {
  return (
    <div className="initSessionContainer">
      <p className="text">
        Por el momento no cuentas con ninguna sesión agendada...{" "}
      </p>
      <h1 className="text">
        Si quieres hacerlo,
        <Link to={"/Historial"}>
          <div className="infoText"> {"Presiona aquí"} </div>
        </Link>
      </h1>
    </div>
  );
}
