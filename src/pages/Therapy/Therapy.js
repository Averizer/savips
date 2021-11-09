import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import FooterPaciente from "./FooterPaciente/FooterPaciente";
import FooterPsico from "./FooterPsico/FooterPsico";
import TopBarTherapy from "./TopBarTherapy/TopBarTherapy";

import BasicModal from "../../components/Modal/BasicModal/BasicModal";

import {
  getTherapySession,
  getTherapistSessions,
  verifyPacient,
} from "../../utils/Api";

import { ContextProvider } from "../../utils/ServerIO";

import { format } from "date-fns";

import "./Therapy.scss";

export default function Therapy(props) {
  const { setNotificationsContent, userInfo, setRefresh, refresh, id } = props;
  const [noteVisible, setNoteVisible] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const [calendarEvents, setCalendarEvents] = useState([]);

  // const sessionId = "ZlIDvvhXB0RWTVcK0SHn";

  const [sessionInfo, setSessionInfo] = useState({});

  // console.log(id[0].id);
  let sessionId;

  useEffect(() => {
    if (!id[0]) {
      window.location.href = "http://localhost:3000/TherapyConfig";
      // window.location.reload(false);
    } else {
      sessionId = id[0].id;
    }
  }, []);

  useEffect(() => {
    setRefresh((state) => !state);
  }, []);

  useEffect(async () => {
    // let v = [];
    if (userInfo.email) {
      await getTherapistSessions(userInfo.email).then((res) => {
        res.forEach(async (doc) => {
          const inicio = doc.data().time.seconds * 1000;
          const horaInit = format(inicio, "yyyy-MM-dd'T'HH:mm:ss");
          await verifyPacient(doc.data().paciente).then((res) => {
            const data = { title: res.data().nombre, start: horaInit };
            setCalendarEvents((array) => [...array, data]);
          });
        });
      });
      // .finally(() => {
      // });
    }
  }, [userInfo]);

  useEffect(async () => {
    await getTherapySession(sessionId)
      .then((res) => {
        setSessionInfo({ ...res.data(), id: res.id });
      })
      .catch((e) => console.log(e));
  }, [refresh]);

  return (
    <div className="therapy">
      <ContextProvider sessionId={sessionId}>
        {sessionInfo && (
          <TopBarTherapy
            userInfo={userInfo}
            setTitleModal={setTitleModal}
            setContentModal={setContentModal}
            setShowModal={setShowModal}
            noteContent={noteContent}
            sessionInfo={sessionInfo}
          />
        )}
        <VideoPlayer
          setNotificationsContent={setNotificationsContent}
          noteVisible={noteVisible}
        />
        {userInfo.role === "psicologo" ? (
          <FooterPsico
            setNoteVisible={setNoteVisible}
            noteVisible={noteVisible}
            setNoteContent={setNoteContent}
            noteContent={noteContent}
            userInfo={userInfo}
          />
        ) : (
          <FooterPaciente
            setNoteVisible={setNoteVisible}
            noteVisible={noteVisible}
            setNoteContent={setNoteContent}
            noteContent={noteContent}
          />
        )}
        <BasicModal
          show={showModal}
          setShow={setShowModal}
          title={titleModal}
          block={true}
        >
          {contentModal}
        </BasicModal>
      </ContextProvider>
    </div>
  );
}
