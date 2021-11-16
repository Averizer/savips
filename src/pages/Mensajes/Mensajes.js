import React, { useState, useEffect, useRef } from "react";
import { Grid } from "semantic-ui-react";
import { db } from "../../utils/Api";
import firebase from "../../utils/firebase";
import "firebase/auth";
import "./Mensajes.scss";
import SendMessage from "../../components/Mensajes/SendMessage";
import { useParams } from "react-router-dom";
import ListPatient from "../../components/MenuRight/ListPatient/ListPatient";

export default function Mensajes(props) {
  const { setNotificationHide, userInfo } = props;
  const scroll = useRef();
  const [paciente, setPaciente] = useState("");
  const [psicologo, setPsicologo] = useState("");
  const [messages, setMessages] = useState([]);

  // const id = "marcellino.stas@zooants.com";
  const { id } = useParams();
  console.log(id);

  const executeScroll = () => {
    if (scroll.current) {
      scroll.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      console.log("DE: paciente", paciente, "psicologo", psicologo);

      if (userInfo.role === "paciente") {
        setPaciente(userInfo.email);
        setPsicologo(userInfo.emailpsico);
        setNotificationHide(false);
      } else {
        setPsicologo(userInfo.email);
        setPaciente(id);
      }
      console.log(userInfo);
    }
  }, [userInfo, id]);

  useEffect(() => {
    console.log("paciente", paciente, "psicologo", psicologo);
    if (paciente && psicologo) {
      db.collection("messages")
        .orderBy("createdAt")
        .where("paciente", "==", paciente)
        .where("psicologo", "==", psicologo)
        .limit(50)
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id, paciente, psicologo]);

  return (
    <Grid>
      <div className="mensjes" ref={executeScroll}>
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
          <SendMessage
            scroll={scroll}
            paciente={paciente}
            psicologo={psicologo}
          />
        </Grid.Row>
      </div>
    </Grid>
  );
}
