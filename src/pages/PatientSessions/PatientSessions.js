import React from "react";

import "./PatientSessions.scss";

export default function PatientSessions(props) {
  const { patientSessionsContent } = props;
  return <div className="mainListPatient">{patientSessionsContent}</div>;
}
