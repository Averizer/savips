import React, { useState, useEffect, useRef } from "react";
import { Grid } from "semantic-ui-react";
import { db } from "../../utils/Api";
import firebase from "../../utils/firebase";
import "firebase/auth";
import "./Mensajes.scss";
import SendMessage from "../../components/Mensajes/SendMessage";

export default function Mensajes() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <Grid>
      <div className="mensjes">
        <Grid.Row>
          <div className="msgs">
            {messages.map(({ id, text, photoURL, uid }) => (
              <div>
                <div
                  key={id}
                  className={`msg ${
                    uid === firebase.auth().currentUser.uid
                      ? "sent"
                      : "received"
                  }`}
                >
                  <img src={photoURL} alt="" />
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div ref={scroll}></div>
        </Grid.Row>
        <Grid.Row>
          <SendMessage scroll={scroll} />
        </Grid.Row>
      </div>
    </Grid>
  );
}
