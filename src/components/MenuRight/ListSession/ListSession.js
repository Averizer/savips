import React, { useEffect, useState, useCallback } from "react";

import { List } from "semantic-ui-react";

import { fetchSessionData } from "../../../utils/fetchSessionData";
import ItemSession from "./ItemSession/ItemSession";

export default function ListSession(props) {
  const { userInfo, setpatientSessionsContent } = props;

  const [sessionList, setSessionList] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [flag, setFlag] = useState(true);

  const fetchList = useCallback(async () => {
    await fetchSessionData(userInfo, setSessionList, setFlag);
  }, [userInfo]);

  useEffect(() => {
    fetchList();
  }, [userInfo]);

  useEffect(() => {
    if (sessionList) {
      const sessions = sessionList.filter((x) => x.status === "Finalizada");
      // if (sessions.length > 0) {
      //   sessionId = sessions[0].id;
      // }
      setCalendarEvents(
        sessions.map((calendarEvents) => (
          <ItemSession calendarEvents={calendarEvents} />
        ))
      );
      // console.log("LISTAS", sessions);
    }
  }, [flag]);

  return (
    <div className="listBar">
      <h1 className="title">Sesiones</h1>
      {calendarEvents && (
        <List selection verticalAlign="middle" size="large">
          {calendarEvents}
        </List>
      )}
    </div>
  );
}
