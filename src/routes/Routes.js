import React from "react";
import { Switch, Route } from "react-router-dom";

//Paginas
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Mensajes from "../pages/Mensajes";
import Historial from "../pages/Historial";
import Calendario from "../components/Calendario";
import Therapy from "../pages/Therapy";

export default function Routes(props) {
  const { userInfo, setReloadApp, setNotificationsContent, user } = props;

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
        <Historial />
      </Route>
      <Route path="/Settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} userInfo={userInfo} />
      </Route>
      <Route path="/Therapy" exact>
        <Therapy
          setNotificationsContent={setNotificationsContent}
          userInfo={userInfo}
          setReloadApp={setReloadApp}
        />
      </Route>
    </Switch>
  );
}
