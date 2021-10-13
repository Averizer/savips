import React, { useState, useEffect } from "react";
import VideoPlayer from "../../components/Terapy/VideoPlayer/VideoPlayer";
import Notifications from "../../components/Terapy/Notifications/Notifications";
import Options from "../../components/Terapy/Options/Options";
import { ContextProvider } from "../../utils/ServerIO";

export default function Therapy(props) {
  const { setNotificationsContent } = props;

  return (
    <div>
      <ContextProvider>
        <VideoPlayer setNotificationsContent={setNotificationsContent} />
        <Options>
          <Notifications />
        </Options>
      </ContextProvider>
    </div>
  );
}
