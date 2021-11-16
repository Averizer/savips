import React, { useState, useEffect } from "react";

import ListPatient from "../../components/MenuRight/ListPatient/ListPatient";

import ListSession from "../../components/MenuRight/ListSession/ListSession";

import "./Historial.scss";

export default function Historial(props) {
  const {
    setNotificationsContent,
    userInfo,
    setpatientSessionsContent,
    setReloadApp,
    setNotificationHide,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    // console.log(userInfo.role);
    setNotificationHide(true);
    userInfo.role === "psicologo"
      ? setNotificationsContent(
          <ListPatient
            userInfo={userInfo}
            setpatientSessionsContent={setpatientSessionsContent}
            setReloadApp={setReloadApp}
            flag={true}
          />
        )
      : setNotificationsContent(
          <ListSession
            userInfo={userInfo}
            setpatientSessionsContent={setpatientSessionsContent}
          />
        );
  }, [userInfo]);

  return (
    <div>
      {/* {userInfo.role === "paciente" && (
        <Grid className="historial">
          <Grid.Row className="t1">
            <h1>Nivel de estrés detectado durante la sesión</h1>
          </Grid.Row>
          <Grid.Row className="stressChart">
            <Grid.Column className="cl1" width={15}>
              <MainChart level={level} />
            </Grid.Column>
            <Grid.Column className="cl2" width={1}>
              <h1>mins</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="extraInfo">
            <Grid.Column className="cl3">
              <h1 className="title">Promedio</h1>
              <h1 className="result">{extraValues.prom}</h1>
            </Grid.Column>
            <Grid.Column className="cl4">
              <h1 className="title">Nivel mas alto</h1>
              <h1 className="result">{extraValues.limSup}</h1>
            </Grid.Column>
            <Grid.Column className="cl5">
              <h1 className="title">Nivel mas bajo </h1>
              <h1 className="result">{extraValues.limInf}</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="t1">
            <h1>Notas</h1>
          </Grid.Row>
          <Grid.Row className="notes" onClick={() => handlerModal()}>
            <TextShown note={note} />
          </Grid.Row>
        </Grid>
      )}

      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal> */}
    </div>
  );
}

function TextShown(note) {
  let finalText = "";
  for (let i = 0; i < 375; i++) {
    finalText += note.note[i];
  }
  return <h1>{finalText}...</h1>;
}

let lastSec = 2;
const randomStressChartValues = (minutes, timelapse, factor) => {
  let data = '{"jsonarray":[';
  let timestap = minutes * (60 / timelapse);
  for (let i = 0; i < timestap; i++) {
    let lowerLimit = lastSec - factor;
    let upperLimit = lastSec + factor;

    let stress = Math.random() * (upperLimit - lowerLimit) + lowerLimit;

    data += `{"timestap":${((i * timelapse) / 60).toFixed(
      1
    )}, "stress": ${stress}},`;
    if (i === timestap - 1) {
      data += `{"timestap": ${minutes}, "stress": ${stress}}`;
    }
    lastSec = stress;
  }
  data += "]}";
  return data;
};
