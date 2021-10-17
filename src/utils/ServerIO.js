import React, { createContext, useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const connectSocketServer = () => {
  const socket = io.connect("https://savips.herokuapp.com");
  // const socket = io.connect("http://localhost:8000");
  socket.emit("client", "pepe");

  return socket;
};

const SocketContext = createContext();

let myVideoStream;

function ContextProvider(props) {
  const { children } = props;

  const [socket] = useState(() => connectSocketServer());
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [mindWaves, setMindWaves] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        myVideoStream = currentStream;
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("dataResult", (data) => {
      setMindWaves(data);
    });

    socket.on("me", (id) => setMe(id));

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
      console.log(currentStream);
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
      console.log(currentStream);

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

    window.location.reload();
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { ContextProvider, SocketContext };
