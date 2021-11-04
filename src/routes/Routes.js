import React, { useState } from "react";
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

export default function Routes(props) {
  const { userInfo, setReloadApp, setNotificationsContent, user } = props;
  const [patientSessionsContent, setpatientSessionsContent] = useState(
    <div></div>
  );

  const [refresh, setRefresh] = useState(false);

  return (
    <Switch>
      <Route path="/" exact>
        <Home user={user} />
      </Route>
      <Route path="/Calendario" exact>
        <Calendario setReloadApp={setReloadApp} />
      </Route>
      <Route path="/Mensajes" exact>
        <Mensajes />
      </Route>
      <Route path="/Historial" exact>
        <Historial
          setNotificationsContent={setNotificationsContent}
          userInfo={userInfo}
          setpatientSessionsContent={setpatientSessionsContent}
        />
      </Route>
      <Route path="/Settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} userInfo={userInfo} />
      </Route>
      <Route path="/Therapy" exact>
        <Therapy
          setRefresh={setRefresh}
          refresh={refresh}
          setNotificationsContent={setNotificationsContent}
          userInfo={userInfo}
          setReloadApp={setReloadApp}
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
