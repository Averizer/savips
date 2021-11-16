import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";

//Paginas
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Mensajes from "../pages/Mensajes";
import Historial from "../pages/Historial";
import Calendario from "../components/Calendario";
import Therapy from "../pages/Therapy";
import PatientSessions from "../pages/PatientSessions/PatientSessions";
import PatientSessionDescription from "../pages/PatientSessionDescription/PatientSessionDescription";
import TherapyConfig from "../pages/TherapyConfig/TherapyConfig";
import MensajesConfig from "../pages/MensajesConfig/MensajesConfig";

export default function Routes(props) {
  const {
    userInfo,
    setReloadApp,
    setNotificationsContent,
    user,
    setNotificationHide,
  } = props;
  const [patientSessionsContent, setpatientSessionsContent] = useState(
    <div></div>
  );

  return (
    <Switch>
      <Route path="/" exact>
        <Home user={user} />
      </Route>
      <Route path="/Calendario" exact>
        <Calendario
          setReloadApp={setReloadApp}
          userInfo={userInfo}
          setNotificationHide={setNotificationHide}
          // calendarEvents={calendarEvents}
        />
      </Route>
      <Route path="/MensajesConfig" exact>
        {userInfo.role === "psicologo" ? (
          <MensajesConfig
            setNotificationsContent={setNotificationsContent}
            setNotificationHide={setNotificationHide}
            userInfo={userInfo}
          />
        ) : (
          <Mensajes
            setNotificationHide={setNotificationHide}
            userInfo={userInfo}
            setNotificationsContent={setNotificationsContent}
          />
        )}
      </Route>
      <Route path="/Mensajes/:id" exact>
        <Mensajes
          setNotificationHide={setNotificationHide}
          userInfo={userInfo}
          setNotificationsContent={setNotificationsContent}
        />
      </Route>
      <Route path="/Historial" exact>
        <Historial
          setNotificationsContent={setNotificationsContent}
          userInfo={userInfo}
          setpatientSessionsContent={setpatientSessionsContent}
          setReloadApp={setReloadApp}
          setNotificationHide={setNotificationHide}
        />
      </Route>
      <Route path="/Settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} userInfo={userInfo} />
      </Route>
      <Route path="/TherapyConfig" exact>
        <TherapyConfig
          userInfo={userInfo}
          setNotificationHide={setNotificationHide}
        />
      </Route>
      <Route path="/Therapy/:id" exact>
        <Therapy
          setNotificationsContent={setNotificationsContent}
          userInfo={userInfo}
          setNotificationHide={setNotificationHide}
        />
      </Route>
      <Route path="/PatientSessions" exact>
        <PatientSessions patientSessionsContent={patientSessionsContent} />
      </Route>
      <Route path="/PatientSessionDescription/:id/:paciente">
        <PatientSessionDescription userInfo={userInfo} />
      </Route>
    </Switch>
  );
}
