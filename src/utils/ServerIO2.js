import React, { createContext,  useState} from "react";
import io from "socket.io-client";

const connectSocketServer = () => {
  const socket = io.connect("https://localhost/:8000");
  
  return socket;
};

const SocketContext = createContext();

// const ContextProvider = ({ children }, setData, setOnline) => {
const ContextProvider = ({ children }) => {
  //const [socket] = useState(() => connectSocketServer());
  const me  = "EMILIANO"
  //socket.on("connect",({ children }) => { console.log("connected")} )
  
  return (
    <SocketContext.Provider value={me}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
