import React, { useState, useEffect } from "react";
import VideoPlayer from "../../components/Terapy/VideoPlayer/VideoPlayer";
import Notifications from "../../components/Terapy/Notifications/Notifications";
import Options from "../../components/Terapy/Options/Options";
import { ContextProvider } from "../../utils/ServerIO";

export default function Therapy(props) {
  const { setContent, setNotifications, setNotificationsContent } = props;
  const [data, setData] = useState("");
  const [online, setOnline] = useState(null);

  return (
    <div>
      <ContextProvider>
        <VideoPlayer
          setContent={setContent}
          setNotifications={setNotifications}
          setNotificationsContent={setNotificationsContent}
        />
        <Options>
          <Notifications />
        </Options>
      </ContextProvider>
    </div>
  );
}
