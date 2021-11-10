import React, { useState, useEffect, useCallback } from "react";
//Usando API fullcalendar 5.0
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import StyleWrapper from "./styleWrapper";

import { fetchSessionData } from "../../utils/fetchSessionData";

import "./Calendario.scss";

export default function Calendario(props) {
  const { userInfo } = props;
  const [sessionList, setSessionList] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState(null);

  const [flag, setFlag] = useState(true);

  const fetchList = useCallback(async () => {
    await fetchSessionData(userInfo, setSessionList, setFlag);
  }, [userInfo]);

  useEffect(() => {
    fetchList();
  }, [userInfo]);

  useEffect(() => {
    setCalendarEvents(sessionList);
  }, [flag]);

  return (
    <div className="calendar">
      {calendarEvents && (
        <StyleWrapper>
          <FullCalendar
            firstDay={1}
            themeSystem={"default"}
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            eventColor={"#bd8ebf"}
            events={calendarEvents}
          />
        </StyleWrapper>
      )}
    </div>
  );
}
