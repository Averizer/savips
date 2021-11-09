import React, { useEffect, useState } from "react";
import ItemPatient from "./ItemPatient/ItemPatient";
import { List } from "semantic-ui-react";

import { getPatientList } from "../../../utils/Api";

import "./ListPatient.scss";

export default function ListPatient(props) {
  const { userInfo, setpatientSessionsContent, setReloadApp } = props;

  const [listPatient, setListPatient] = useState(null);
  const [listPatientBD, setListPatientBD] = useState(null);

  useEffect(async () => {
    await getPatientList(userInfo.email).then((res) => setListPatientBD(res));
  }, [setReloadApp]);

  useEffect(() => {
    if (listPatientBD) {
      setListPatient(
        listPatientBD.map((listPatientBD) => (
          <ItemPatient
            patient={listPatientBD}
            setpatientSessionsContent={setpatientSessionsContent}
            userInfo={userInfo}
            setReloadApp={setReloadApp}
          />
        ))
      );
    }
  }, [listPatientBD]);

  return (
    <div className="listBar">
      <h1 className="title">Pacientes</h1>
      {listPatient && (
        <List selection verticalAlign="middle" size="large">
          {listPatient}
        </List>
      )}
    </div>
  );
}
