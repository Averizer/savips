import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8000");
  socket.emit("client", "pepe");
  return socket;
};

export default function Therapy() {
  const [socket] = useState(() => connectSocketServer());
  const [online, setOnline] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket: ", socket.id, "conectado");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", function () {
      console.log("Perdimos conexión con el Servidor");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("dataResult", (data) => {
      setData(data);
    });
  }, [socket]);

  return (
    <div>
      {/* <h1>EJEMPLO</h1> */}
      {/* <h1>{data}</h1> */}
    </div>
  );
}
