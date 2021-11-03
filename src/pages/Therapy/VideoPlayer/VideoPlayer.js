import React, { useContext, useState, useEffect } from "react";
import { Grid, Icon } from "semantic-ui-react";

import { SocketContext } from "../../../utils/ServerIO";

import MyVideo from "../../../components/MenuRight/MyVideo/MyVideo";

const VideoPlayer = (props) => {
  const { setNotificationsContent, noteVisible } = props;
  const {
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    mindWaves,
    playStop,
    muteUnmute,
    setVideId,
  } = useContext(SocketContext);

  const [videoMyShape, setVideoMyShape] = useState("");
  const [videoUserShape, setVideoUserShape] = useState("");
  const [videoMyMain, setVideoMyMain] = useState("");
  const [videoMyHide, setVideoMyHide] = useState(true);
  const [videoUserHide, setVideoUserHide] = useState(true);

  const [videoCompleteHide, setVideoCompleteHide] = useState(false);
  const [videoCompleteShape, setVideoCompleteShape] = useState("gridVideo");

  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(false);

  useEffect(() => {
    if (callAccepted && !callEnded) {
      setNotificationsContent(<MyVideo data={""} setVideId={setVideId} />);
      setVideoMyShape("hidden");
      setVideoMyMain("c2");

      if (videoMyHide) {
        setVideoMyShape("videocall");
      } else {
        setVideoMyShape("hidden");
      }

      if (videoUserHide) {
        setVideoUserShape("video");
      } else {
        setVideoUserShape("hidden");
      }

      if (videoCompleteHide) {
        setVideoCompleteShape("gridVideo");
      } else {
        setVideoCompleteShape("gridVideoHide");
      }
    } else if (stream) {
      setVideoMyMain("c1");
      setVideoMyShape("video");
    }
  }, [callAccepted, callEnded, stream, videoMyHide, videoUserHide]);

  useEffect(() => {
    setNotificationsContent(<MyVideo data={mindWaves} />);
  }, [mindWaves]);

  // useEffect(() => {
  //   // setNotificationsContent(<MyVideo setVideId={setVideId} />);
  //   console.log(set);
  // }, [setVideId]);

  useEffect(() => {
    if (noteVisible) {
      setVideoMyHide(false);
      setVideoUserHide(false);
      setVideoCompleteHide(false);
    } else {
      setVideoMyHide(true);
      setVideoUserHide(true);
      setVideoCompleteHide(true);
    }
  }, [noteVisible]);

  return (
    <Grid className={videoCompleteShape}>
      <Grid.Row className="videoBar">
        {callAccepted && !callEnded && (
          <Grid.Column className="c1" textAlign="center">
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={videoUserShape}
            />
          </Grid.Column>
        )}
        {stream ? (
          <Grid.Column className={videoMyMain} textAlign="center">
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={videoMyShape}
            />
          </Grid.Column>
        ) : (
          <div className="ui active centered inline loader"></div>
        )}
      </Grid.Row>
      {stream && !noteVisible && (
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
            <Icon
              name="video"
              disabled={video}
              size="large"
              className="micro"
            />
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

export default VideoPlayer;
