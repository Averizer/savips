import React from "react";
import { Switch, Route } from "react-router-dom";

//Paginas
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Mensajes from "../pages/Mensajes";
import Historial from "../pages/Historial";
import Calendario from "../components/Calendario";
import Therapy from "../pages/Therapy";
import Terapia from "../pages/Terapia";

export default function Routes(props) {
  const {
    user,
    setReloadApp,
    setContent,
    setNotifications,
    setNotificationsContent,
  } = props;

  return (
    <Switch>
      <Route path="/" exact>
        <Home user={user} />
      </Route>
      <Route path="/Calendario" exact>
        <Calendario user={user} setReloadApp={setReloadApp} />
      </Route>
      <Route path="/Mensajes" exact>
        <Mensajes user={user} />
      </Route>
      <Route path="/Historial" exact>
        <Historial />
      </Route>
      <Route path="/Settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} />
      </Route>
      <Route path="/Therapy" exact>
        <Therapy
          setContent={setContent}
          setNotifications={setNotifications}
          setNotificationsContent={setNotificationsContent}
        />
      </Route>
      <Route path="/Terapia" exact>
        <Terapia user={user} setReloadApp={setReloadApp} />
      </Route>
    </Switch>
  );
}
