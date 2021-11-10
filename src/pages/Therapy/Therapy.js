import React, { useState, useEffect, useCallback } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import FooterPaciente from "./FooterPaciente/FooterPaciente";
import FooterPsico from "./FooterPsico/FooterPsico";
import TopBarTherapy from "./TopBarTherapy/TopBarTherapy";

import BasicModal from "../../components/Modal/BasicModal/BasicModal";

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

  const [sessionInfo, setSessionInfo] = useState({});

  // console.log(id[0].id);
  let sessionId;

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [flag, setFlag] = useState(true);

  const fetchList = useCallback(async () => {
    await fetchSessionData(userInfo, setSessionList, setFlag);
  }, [userInfo]);

  useEffect(() => {
    fetchList();
  }, [userInfo]);

  useEffect(() => {
    // sessionList;
    if (sessionList.length > 0) {
      sessionId = sessionList[0].id;
      console.log("LAAA", sessionId);
    }
    console.log("THERAPY", sessionList);
  }, [flag]);

  useEffect(async () => {
    await getTherapySession(sessionId)
      .then((res) => {
        setSessionInfo({ ...res.data(), id: res.id });
      })
      .catch((e) => console.log(e));
  }, [flag]);

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
