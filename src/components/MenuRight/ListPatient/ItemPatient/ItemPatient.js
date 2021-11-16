import React, { useState } from "react";
import { List, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import ListSessionPatient from "../../../ListSessionPatient/ListSessionPatient";

import "./ItemPatient.scss";

export default function ItemPatient(props) {
  const { patient, userInfo, setpatientSessionsContent, setReloadApp, flag } =
    props;

  const [changeItem, setChangeItem] = useState(true);

  const getInitials = (nombre) => {
    if (nombre)
      return nombre
        .split(" ")
        .map((n) => n[0])
        .join("");
  };
  console.log(flag);

  return (
    <Link to={flag ? "/patientSessions" : `/Mensajes/${patient.emailpatient}`}>
      {/* // <Link to={flag ? "/patientSessions" : `/Mensajes/`}> */}
      <List.Item
        onClick={() => {
          if (flag) {
            setChangeItem(!changeItem);
            setpatientSessionsContent(
              <ListSessionPatient
                patient={patient}
                userInfo={userInfo}
                setReloadApp={setReloadApp}
                changeItem={changeItem}
              />
            );
          }
        }}
      >
        <div className="item">
          <Label circular size="big" className="labelItem">
            {getInitials(patient.nombrepatient)}
          </Label>
          <List.Content>
            <List.Header className="headerItem">
              {patient.nombrepatient}
            </List.Header>
          </List.Content>
        </div>
      </List.Item>
    </Link>
  );
}
