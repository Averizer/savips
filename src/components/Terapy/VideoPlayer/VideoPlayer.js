import React, { useContext, useState, useEffect } from "react";
import { Grid, Icon } from "semantic-ui-react";

import { SocketContext } from "../../../utils/ServerIO";

import "./VideoPlayer.scss";
import MyVideo from "../../MenuRight/MyVideo/MyVideo";

const VideoPlayer = (props) => {
  const { setNotificationsContent } = props;
  const {
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    mindWaves,
    playStop,
    muteUnmute,
  } = useContext(SocketContext);

  const [videoMyShape, setVideoMyShape] = useState("");
  const [videoUserWidth, setVideoUserWidth] = useState(5);
  const [videoMyWidth, setVideoMyWidth] = useState(16);
  const [videoMyHide, setVideoMyHide] = useState(true);
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(false);

  useEffect(() => {
    if (callAccepted && !callEnded) {
      setNotificationsContent(<MyVideo data={0} />);
      setVideoUserWidth(16);
      setVideoMyWidth(5);
      setVideoMyShape("hidden");

      if (videoMyHide) {
        setVideoMyShape("videocall");
      } else {
        setVideoMyShape("hidden");
      }
    } else if (stream) {
      setVideoMyWidth(16);
      setVideoMyShape("video");
    }
  }, [callAccepted, callEnded, stream, videoMyHide]);

  useEffect(() => {
    setNotificationsContent(<MyVideo data={mindWaves} />);
  }, [mindWaves]);

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
              }}
            />
          </Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row className="menuOption">
        <Grid.Column
          className="c1"
          onClick={() => {
            setAudio(!audio);
            muteUnmute(audio);
          }}
        >
          <Icon
            name="microphone"
            disabled={audio}
            size="large"
            className="micro"
          />
        </Grid.Column>
        <Grid.Column
          className="c1"
          onClick={() => {
            setVideo(!video);
            playStop(video);
          }}
        >
          <Icon name="video" disabled={video} size="large" className="micro" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default VideoPlayer;
