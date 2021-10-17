import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as BR } from "react-router-dom";
import { verifyPsico, verifyPacient } from "../../utils/Api";

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
  const [userInfo, setUserInfo] = useState({});
  const [notificationsContent, setNotificationsContent] = useState(
    <div className="notificaciones">
      <h1>Notificaciones</h1>
    </div>
  );

  useEffect(() => {
    setReloadApp();
    verifyPsico(user.email).then((response) => {
      const data = response.data();
      if (data) {
        setUserInfo(data);
        console.log(data);
      }
    });

    verifyPacient(user.email).then((response) => {
      const data = response.data();
      if (data) {
        setUserInfo(data);
        console.log(data);
      }
    });
  }, [user, setReloadApp]);

  return (
    <BR>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft setReloadApp={setReloadApp} userInfo={userInfo} />
          </Grid.Column>
          <Grid.Column className="content" width={content}>
            <TopBar user={user} />
            <Routes
              user={user}
              userInfo={userInfo}
              setReloadApp={setReloadApp}
              setContent={setContent}
              setNotifications={setNotifications}
              setNotificationsContent={setNotificationsContent}
            />
          </Grid.Column>
          <Grid.Column width={notifications}>
            <Notificaciones notificationsContent={notificationsContent} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BR>
  );
}
