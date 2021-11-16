import React, { createContext, useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const connectSocketServer = (id) => {
  const socket = io.connect("https://savips.herokuapp.com");
  // const socket = io.connect("http://localhost:8000");
  if (id != null) {
    socket.emit("client", id);
  }

  return socket;
};
//
const SocketContext = createContext();

let myVideoStream;

function ContextProvider(props) {
  const { children, sessionId } = props;
  // console.log("ID DE SESION: ", sessionId);

  const [socket] = useState(() => connectSocketServer(sessionId));

  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [mindWaves, setMindWaves] = useState("");
  const [guess, setGuess] = useState(undefined);
  const [videoId, setVideoId] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((currentStream) => {
        myVideoStream = currentStream;
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("dataResult", (data) => {
      setMindWaves(data);
    });

    socket.on("me", (id) => setMe(id));

    socket.on("guess", (guess) => {
      setGuess(guess);
      console.log("GUESS: ", guess);
    });

    socket.on("videoId", (videoId) => {
      setVideoId(videoId);
      console.log(videoId);
    });

    socket.on("callEnded", (callEnded) => {
      if (callEnded) {
        connectionRef.current.destroy();
        window.location.href = "http://localhost:3000/TherapyConfig";
        // window.location.reload();
      }
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const playStop = (video) => {
    console.log(video);
    if (video) {
      myVideoStream.getVideoTracks()[0].enabled = true;
    } else {
      myVideoStream.getVideoTracks()[0].enabled = false;
    }
  };

  const muteUnmute = (audio) => {
    console.log(audio);
    if (audio) {
      myVideoStream.getAudioTracks()[0].enabled = true;
    } else {
      myVideoStream.getAudioTracks()[0].enabled = false;
    }
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    // window.location.reload();
    socket.emit("callEnded", true);
  };

  const setVideId = (videoId) => {
    socket.emit("videoId", videoId);
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        mindWaves,
        playStop,
        muteUnmute,
        guess,
        videoId,
        setVideId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { ContextProvider, SocketContext };
