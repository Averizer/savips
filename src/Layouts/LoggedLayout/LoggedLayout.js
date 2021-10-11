import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as BR } from "react-router-dom";
import "./LoggedLayout.scss";

//Componentes
import TopBar from "../../components/TopBar";
import Routes from "../../routes/Routes";
import MenuLeft from "../../components/MenuLeft";
import Notificaciones from "../../components/Notificaciones";
export default function LoggedLayout(props) {
  const { user, setReloadApp } = props;
  const [content, setContent] = useState(9);
  const [notifications, setNotifications] = useState(4);
  const [notificationsContent, setNotificationsContent] = useState(
    <div className="notificaciones">
      <h1>Notificaciones</h1>
    </div>
  );
  return (
    <BR>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} setReloadApp={setReloadApp} />
          </Grid.Column>
          <Grid.Column className="content" width={content}>
            <TopBar user={user} />
            <Routes
              user={user}
              setReloadApp={setReloadApp}
              setContent={setContent}
              setNotifications={setNotifications}
              setNotificationsContent={setNotificationsContent}
            />
          </Grid.Column>
          <Grid.Column width={notifications}>
            <Notificaciones
              user={user}
              notificationsContent={notificationsContent}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BR>
  );
}
