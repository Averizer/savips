import React, { useState, useEffect } from "react";
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

import { getTherapistSessions, verifyPacient } from "../utils/Api";
import { format } from "date-fns";

export default function Routes(props) {
  const { userInfo, setReloadApp, setNotificationsContent, user } = props;
  const [patientSessionsContent, setpatientSessionsContent] = useState(
    <div></div>
  );

  const [refresh, setRefresh] = useState(false);

  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(async () => {
    // let v = [];
    if (userInfo.email) {
      await getTherapistSessions(userInfo.email).then((res) => {
        res.forEach(async (doc) => {
          const inicio = doc.data().time.seconds * 1000;
          const fin = doc.data().timeEnd.seconds * 1000;
          const horaInit = format(inicio, "yyyy-MM-dd'T'HH:mm:ss");
          const horaEnd = format(fin, "yyyy-MM-dd'T'HH:mm:ss");
          await verifyPacient(doc.data().paciente).then((res) => {
            const data = {
              title: res.data().nombre,
              start: horaInit,
              end: horaEnd,
              id: doc.id,
            };
            setCalendarEvents((array) => [...array, data]);
          });
        });
      });
      // .finally(() => {
      // });
    }
  }, [userInfo]);

  return (
    <Switch>
      <Route path="/" exact>
        <Home user={user} />
      </Route>
      <Route path="/Calendario" exact>
        <Calendario setReloadApp={setReloadApp} userInfo={userInfo} />
      </Route>
      <Route path="/Mensajes" exact>
        <Mensajes />
      </Route>
      <Route path="/Historial" exact>
        <Historial
          setNotificationsContent={setNotificationsContent}
          userInfo={userInfo}
          setpatientSessionsContent={setpatientSessionsContent}
          setReloadApp={setReloadApp}
        />
      </Route>
      <Route path="/Settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} userInfo={userInfo} />
      </Route>
      <Route path="/TherapyConfig" exact>
        <TherapyConfig userInfo={userInfo} calendarEvents={calendarEvents} />
      </Route>
      <Route path="/Therapy" exact>
        <Therapy
          setRefresh={setRefresh}
          refresh={refresh}
          setNotificationsContent={setNotificationsContent}
          userInfo={userInfo}
          setReloadApp={setReloadApp}
          id={calendarEvents}
        />
      </Route>
      <Route path="/PatientSessions" exact>
        <PatientSessions patientSessionsContent={patientSessionsContent} />
      </Route>
      <Route path="/PatientSessionDescription">
        <PatientSessionDescription />
      </Route>
    </Switch>
  );
}
