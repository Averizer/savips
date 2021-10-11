import React, { useContext, useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

import { SocketContext } from "../../../utils/ServerIO";

import "./VideoPlayer.scss";

const VideoPlayer = (props) => {
  const { setNotificationsContent, mindWaves } = props;
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  const [videoMyShape, setVideoMyShape] = useState("");
  const [videoUserWidth, setVideoUserWidth] = useState(5);
  const [videoMyWidth, setVideoMyWidth] = useState(16);
  const [videoMyHide, setVideoMyHide] = useState(true);

  useEffect(() => {
    console.log(mindWaves);

    if (callAccepted && !callEnded) {
      setNotificationsContent(
        <div className="notificaciones">
          <h1>Datos stream: {mindWaves}</h1>
        </div>
      );
      setVideoUserWidth(16);
      setVideoMyWidth(5);
      setVideoMyShape("hidden");
      if (videoMyHide) {
        setVideoMyShape("videocall");
      } else {
        setVideoMyShape("hidden");
      }
    } else if (stream) {
      setNotificationsContent(
        <div className="notificaciones">
          <h1>Preparando videollamada</h1>
        </div>
      );
      setVideoMyWidth(16);
      setVideoMyShape("video");
    }
  }, [callAccepted, callEnded, stream, videoMyHide]);

  return (
    <Grid className="gridVideo">
      <Grid.Row className="topBar">
        <Grid.Column className="c1">
          <h1 className="t1">FO</h1>
        </Grid.Column>
        <Grid.Column className="c2">
          <h1 className="t2">Fernanda Ocampo</h1>
        </Grid.Column>
        {/* <Grid.Column className="c3">
          <h1 className="t3">Finalizar</h1>
        </Grid.Column> */}
      </Grid.Row>

      <Grid.Row className="videoBar">
        {callAccepted && !callEnded && (
          <Grid.Column className="c2" width={videoUserWidth}>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="video"
              onClick={() => {
                setVideoMyHide(!videoMyHide);
                console.log(videoMyHide);
              }}
            />
          </Grid.Column>
        )}
        {stream && (
          <Grid.Column className="c1" width={videoMyWidth}>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={videoMyShape}
              onClick={() => {
                setVideoMyHide(!videoMyHide);
                console.log(videoMyHide);
              }}
            />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default VideoPlayer;
