import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import MainChart from "./MainChart";

import ListPatient from "../../components/MenuRight/ListPatient/ListPatient";

import BasicModal from "../../components/Modal/BasicModal/BasicModal";
import "./Historial.scss";

export default function Historial(props) {
  const {
    setNotificationsContent,
    userInfo,
    setpatientSessionsContent,
    setReloadApp,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    userInfo.role === "psicologo" ? (
      setNotificationsContent(
        <ListPatient
          userInfo={userInfo}
          setpatientSessionsContent={setpatientSessionsContent}
          setReloadApp={setReloadApp}
        />
      )
    ) : (
      <div></div>
    );
  }, []);

  const fakeInfo = {
    level: JSON.parse(randomStressChartValues(15, 5, 3)),
    extraValues: {
      prom: 6.2,
      limInf: 3.5,
      limSup: 8.9,
    },
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis non rhoncus eleifend. Suspendisse sit amet tristique ex. Vivamus vel sapien lorem. Nullam eu justo in eros aliquet consectetur et non dolor. Nunc elementum eleifend lacus non consequat. Nam at ipsum at odio fringilla finibus et ac risus. Nullam eget vestibulum leo. Vestibulum euismod arcu diam, in efficitur quam congue scelerisque. Aenean fringilla volutpat elementum. Nullam maximus ornare tincidunt. Aenean id semper risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec cursus, massa eget ultrices mattis, quam tellus dictum libero, eu euismod mi nunc varius nunc. Suspendisse fermentum elementum nunc, nec scelerisque justo. Aenean vehicula eros in ultricies blandit. In consectetur felis sed convallis semper. Vestibulum vel dolor leo. Etiam ut mi eget nisl varius pharetra eu et eros. Cras scelerisque dui mattis enim malesuada, at efficitur tellus commodo. Morbi sollicitudin rutrum enim, eget lacinia ligula. Vivamus id ipsum quis felis condimentum fermentum. Fusce sit amet ipsum sit amet mauris laoreet viverra. Quisque porta nec lorem quis imperdiet. Vestibulum rhoncus sed est a mollis. In gravida pharetra ex, vel tincidunt mauris accumsan quis. Vivamus eros justo, auctor id ligula quis, eleifend placerat augue. Donec mattis sodales dictum. Curabitur eleifend leo ligula, non cursus nisl ultrices eget. Vivamus semper justo sed facilisis laoreet. In non aliquet augue, et ornare augue. Suspendisse leo tortor, ornare quis sagittis vel, luctus id metus. Aenean quis lacus rutrum, venenatis elit ac, placerat arcu. Sed lectus ex, consectetur vitae volutpat quis, tristique quis augue. Integer eros massa, convallis vel egestas vitae, iaculis at lacus. Donec finibus velit eget interdum volutpat. Ut vitae leo lacus. Aliquam condimentum massa erat, vitae dictum ligula blandit in. Praesent et condimentum massa. Morbi condimentum turpis neque, nec rutrum urna rhoncus sit amet. Phasellus non bibendum ligula. Aliquam et dapibus orci, sit amet gravida enim. Sed aliquet pretium interdum. Nam sollicitudin elementum orci, vitae tempor dui interdum dapibus. Quisque tincidunt felis eget tortor hendrerit fringilla.",
  };

  const { level, extraValues, note } = fakeInfo;

  const handlerModal = () => {
    setTitleModal("Notas");
    setContentModal(<h1>{note}</h1>);
    setShowModal(true);
  };

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
