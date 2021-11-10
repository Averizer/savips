import React, { useState } from "react";
import { List, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import ListSessionPatient from "../../../ListSessionPatient/ListSessionPatient";

import "./ItemPatient.scss";

export default function ItemPatient(props) {
  const { patient, userInfo, setpatientSessionsContent, setReloadApp } = props;

  const [changeItem, setChangeItem] = useState(true);

  const getInitials = (nombre) => {
    if (nombre)
      return nombre
        .split(" ")
        .map((n) => n[0])
        .join("");
  };

  return (
    <Link to="/patientSessions">
      <List.Item
        onClick={() => {
          setChangeItem(!changeItem);
          setpatientSessionsContent(
            <ListSessionPatient
              patient={patient}
              userInfo={userInfo}
              setReloadApp={setReloadApp}
              changeItem={changeItem}
            />
          );
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
