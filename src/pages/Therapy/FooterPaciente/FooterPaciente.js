import React, { useContext, useEffect, useState } from "react";
import { Button, Transition, Form, TextArea } from "semantic-ui-react";
import YouTube from "react-youtube";

import { SocketContext } from "../../../utils/ServerIO";

const FooterPaciente = (props) => {
  const { answerCall, call, callAccepted, callEnded, videoId } =
    useContext(SocketContext);
  const [button, setButton] = useState(false);
  const [videoButton, setVideoButton] = useState(true);
  // const [videoIdVideo, setvideoIdVideo] = useState("");

  // const [videoContainer, setVideoContainer] = useState(initialState);

  const { setNoteVisible, noteVisible } = props;

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      origin: "http://localhost:3000",
      // host: "https://www.youtube.com",
    },
  };

  const videoOnReady = (event) => {
    event.target.pauseVideo();
  };

  useEffect(() => {
    if (call.isReceivingCall) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [call.isReceivingCall, callAccepted]);

  useEffect(() => {
    if (videoId) {
      setVideoButton(false);
      console.log(videoId);
    }
  }, [videoId]);

  return (
    <div className="footerTherapy">
      {!callAccepted && !callEnded ? (
        <Button className="button" disabled={button} onClick={answerCall}>
          Unirse a Sesión
        </Button>
      ) : (
        <div>
          <Transition
            visible={noteVisible}
            animation="slide up"
            duration={{ hide: 100, show: 500 }}
          >
            <div>
              <Button
                className="button-tools"
                onClick={() => {
                  setNoteVisible((state) => !state);
                }}
              >
                Videos
              </Button>
              <div className="tools-content">
                {/* <YouTube
                  videoId={videoId}
                  className="youtubeFrame"
                  opts={opts}
                /> */}
                <iframe
                  width="859"
                  className="youtubeFrame"
                  height="483"
                  src={`http://www.youtube.com/embed/${videoId}`}
                  // title="YouTube video player"
                  // frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  // allowFullScreen
                ></iframe>
              </div>
            </div>
          </Transition>
          <Transition
            visible={!noteVisible}
            animation="slide up"
            duration={{ hide: 0, show: 500 }}
          >
            <div className="button-tools-button">
              <Button
                className="button-tools"
                disabled={videoButton}
                onClick={() => {
                  setNoteVisible((state) => !state);
                  {
                    console.log("videoID: ", videoId);
                  }
                }}
              >
                Videos
              </Button>
            </div>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default FooterPaciente;
