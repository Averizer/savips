import React, { useState, useEffect, useCallback } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import FooterPaciente from "./FooterPaciente/FooterPaciente";
import FooterPsico from "./FooterPsico/FooterPsico";
import TopBarTherapy from "./TopBarTherapy/TopBarTherapy";

import BasicModal from "../../components/Modal/BasicModal/BasicModal";
import { useParams } from "react-router-dom";

import { getTherapySession } from "../../utils/Api";

import { ContextProvider } from "../../utils/ServerIO";

import "./Therapy.scss";

export default function Therapy(props) {
  const { setNotificationsContent, userInfo, setNotificationHide } = props;
  const [noteVisible, setNoteVisible] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const { id } = useParams();

  const [sessionInfo, setSessionInfo] = useState({});

  useEffect(async () => {
    setNotificationHide(true);
    if (id === undefined) {
      window.location.href = "http://localhost:3000/TherapyConfig";
    }
    await getTherapySession(id)
      .then((res) => {
        setSessionInfo({ ...res.data(), id: res.id });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="therapy">
      {sessionInfo && id && (
        <ContextProvider sessionId={id}>
          <TopBarTherapy
            userInfo={userInfo}
            setTitleModal={setTitleModal}
            setContentModal={setContentModal}
            setShowModal={setShowModal}
            noteContent={noteContent}
            sessionInfo={sessionInfo}
          />
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
      )}
    </div>
  );
}
