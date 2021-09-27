import React, { useState, useEffect } from "react";
import VideoPlayer from "../../components/Terapy/VideoPlayer/VideoPlayer";
import Notifications from "../../components/Terapy/Notifications/Notifications";
import Options from "../../components/Terapy/Options/Options";
import { ContextProvider } from "../../utils/ServerIO";

export default function Therapy() {
  const [data, setData] = useState("");
  const [online, setOnline] = useState(null);

  return (
    <div>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}
