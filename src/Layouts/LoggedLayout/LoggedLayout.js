import React, { useState, useEffect } from "react";
import { Grid, Transition } from "semantic-ui-react";
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
  const [content, setContent] = useState(13);
  const [notifications, setNotifications] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const [notificationsContent, setNotificationsContent] = useState(
    <div className="notificaciones">
      <h1></h1>
    </div>
  );

  const [notificationHide, setNotificationHide] = useState(false);

  useEffect(() => {
    if (notificationHide) {
      setNotifications(4);
      setContent(9);
    } else {
      setContent(13);
    }
  }, [notificationHide]);

  useEffect(() => {
    setReloadApp((state) => !state);
    verifyPsico(user.email).then((response) => {
      const data = response.data();
      if (data) {
        setUserInfo(data);
      }
    });

    verifyPacient(user.email).then((response) => {
      const data = response.data();
      if (data) {
        setUserInfo(data);
      }
    });
  }, [user, setReloadApp]);

  return (
    <BR>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft
              setReloadApp={setReloadApp}
              userInfo={userInfo}
              user={user}
            />
          </Grid.Column>
          <Grid.Column width={content}>
            <TopBar user={user} />
            <Routes
              user={user}
              userInfo={userInfo}
              setReloadApp={setReloadApp}
              setContent={setContent}
              setNotifications={setNotifications}
              setNotificationsContent={setNotificationsContent}
              setNotificationHide={setNotificationHide}
            />
          </Grid.Column>
          {notificationHide && (
            <Grid.Column width={notifications}>
              <Notificaciones notificationsContent={notificationsContent} />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </BR>
  );
}
