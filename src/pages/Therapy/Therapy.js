import React, { useState, useEffect, useCallback } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import FooterPaciente from "./FooterPaciente/FooterPaciente";
import FooterPsico from "./FooterPsico/FooterPsico";
import TopBarTherapy from "./TopBarTherapy/TopBarTherapy";

import BasicModal from "../../components/Modal/BasicModal/BasicModal";
import { useParams } from "react-router-dom";

import { fetchSessionData } from "../../utils/fetchSessionData";

import {
  getTherapySession,
  getTherapistSessions,
  verifyPacient,
} from "../../utils/Api";

import { ContextProvider } from "../../utils/ServerIO";

import { format } from "date-fns";

import "./Therapy.scss";

export default function Therapy(props) {
  const { setNotificationsContent, userInfo } = props;
  const [noteVisible, setNoteVisible] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const { id } = useParams();
  // console.log(id);
  // let sessionId;

  const [sessionInfo, setSessionInfo] = useState({});

  // const [sessionList, setSessionList] = useState([]);
  // const [flag, setFlag] = useState(true);

  // const fetchList = useCallback(async () => {
  //   await fetchSessionData(userInfo, setSessionList, setFlag);
  // }, [userInfo]);

  // useEffect(() => {
  //   fetchList();
  // }, [userInfo]);

  // useEffect(() => {
  //   const sessions = sessionList.filter((x) => x.status === "Agendada");
  //   if (sessions.length > 0) {
  //     sessionId = sessions[0].id;
  //   }
  // }, [flag]);

  useEffect(async () => {
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
          {/* {sessionInfo && ( */}
          <TopBarTherapy
            userInfo={userInfo}
            setTitleModal={setTitleModal}
            setContentModal={setContentModal}
            setShowModal={setShowModal}
            noteContent={noteContent}
            sessionInfo={sessionInfo}
          />
          {/* )} */}
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
