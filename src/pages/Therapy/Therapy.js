import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import FooterPaciente from "./FooterPaciente/FooterPaciente";
import FooterPsico from "./FooterPsico/FooterPsico";
import TopBarTherapy from "./TopBarTherapy/TopBarTherapy";

import BasicModal from "../../components/Modal/BasicModal/BasicModal";

import { getTherapySession } from "../../utils/Api";

import { ContextProvider } from "../../utils/ServerIO";

import "./Therapy.scss";

export default function Therapy(props) {
  const { setNotificationsContent, userInfo, setRefresh, refresh } = props;
  const [noteVisible, setNoteVisible] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const sessionId = "ZlIDvvhXB0RWTVcK0SHn";

  const [sessionInfo, setSessionInfo] = useState({});

  useEffect(() => {
    setRefresh((state) => !state);
  }, []);

  useEffect(async () => {
    await getTherapySession(sessionId)
      .then((res) => {
        setSessionInfo({ ...res.data(), id: res.id });
      })
      .catch((e) => console.log(e));
  }, [refresh]);

  // useEffect(() => {
  //   console.log(sessionInfo);
  // }, [sessionInfo]);

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
