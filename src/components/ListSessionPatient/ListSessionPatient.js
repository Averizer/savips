import React, { useEffect, useState } from "react";
import { getSessionPatientList } from "../../utils/Api";
import { List } from "semantic-ui-react";

import ListSessionPatientItem from "./ListSessionPatientItem/ListSessionPatientItem";

import "./ListSessionPatient.scss";

export default function ListSessionPatient(props) {
  const { patient } = props;

  const [sessionsDB, setSessionsDB] = useState(null);
  const [listSessionPatient, setlistSessionPatient] = useState(null);

  useEffect(async () => {
    await getSessionPatientList(patient.emailpatient).then((res) => {
      setSessionsDB(res);
    });
  }, []);

  useEffect(() => {
    if (sessionsDB) {
      setlistSessionPatient(
        sessionsDB.map((sessionsDB) => (
          <ListSessionPatientItem session={sessionsDB} />
        ))
      );
      console.log(sessionsDB);
    }
  }, [sessionsDB]);

  return (
    <div className="listSession">
      <h1 className="title1">{patient.nombrepatient}</h1>
      {sessionsDB && (
        <List selection verticalAlign="middle" size="large">
          {listSessionPatient}
        </List>
      )}
    </div>
  );
}
