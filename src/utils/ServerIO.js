import React, {
  createContext,
  useRef,
  useState,
  useEffect,
  children,
} from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { setMinutes } from "date-fns";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8000");
  socket.emit("client", "pepe");
  return socket;
};

const SocketContext = createContext();

// const ContextProvider = ({ children }, setData, setOnline) => {
const ContextProvider = ({ children }) => {
  const [socket] = useState(() => connectSocketServer());
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo && (myVideo.current.srcObject = currentStream);
      });
    socket.on("me", (id) => setMinutes(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isRecievedCall: true, from, name: callerName, signal });
    });
  }, []);

  // useEffect(() => {
  //   setOnline(socket.connected);
  //   socket.on("connect", () => {
  //     console.log("Socket: ", socket.id, "conectado");
  //   });

  //   socket.on("disconnect", function () {
  //     console.log("Perdimos conexión con el Servidor");
  //     socket.on("dataResult", (data) => {
  //       setData(data);
  //     });
  //   });
  // }, [socket]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo && (userVideo.current.srcObject = currentStream);
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
      userVideo && (userVideo.current.srcObject = currentStream);
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
