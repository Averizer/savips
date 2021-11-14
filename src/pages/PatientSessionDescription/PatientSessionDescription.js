import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "semantic-ui-react";
import MainChart from "./MainChart";

import { useParams } from "react-router-dom";

import BasicModal from "../../components/Modal/BasicModal/BasicModal";

import {
  fetchSessionData,
  fetchSessionLastData,
} from "../../utils/fetchLastSessionData";

import fetchStadisticsSession from "../../utils/fetchStadisticsSession";

import "./PatientSessionDescription.scss";

import { getTherapySession } from "../../utils/Api";

export default function PatientSessionDescription(props) {
  const { setNotificationsContent, userInfo, setpatientSessionsContent } =
    props;

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const [dataFromServer, setDataFromServer] = useState([]);
  const [lastDataFromServer, setlastDataFromServer] = useState([]);
  const [stadisticData, setStadisticData] = useState(null);
  const { id, paciente } = useParams();

  const [chart, setChart] = useState();

  useEffect(() => {
    if (id) {
      fetchStadisticsSession(id, setDataFromServer);
      setChart(<MainChart level={dataFromServer.level} />);
    }
  }, [id, dataFromServer]);

  const [nextId, setNextId] = useState(null);
  const [flag, setFlag] = useState(true);

  const fetchList = useCallback(async () => {
    await fetchSessionLastData(paciente, setNextId, setFlag, id);
  }, [userInfo, id]);

  useEffect(() => {
    fetchList();
  }, [userInfo, id]);

  useEffect(async () => {
    if (nextId) {
      fetchStadisticsSession(nextId, setlastDataFromServer);

      if (lastDataFromServer) {
        setStadisticData({
          lInferior: (
            dataFromServer.lInferior - lastDataFromServer.lInferior
          ).toFixed(2),
          lSuperior: (
            dataFromServer.lSuperior - lastDataFromServer.lSuperior
          ).toFixed(2),
          prom: (dataFromServer.prom - lastDataFromServer.prom).toFixed(2),
          promCalm: (
            dataFromServer.promCalm - lastDataFromServer.promCalm
          ).toFixed(2),
          promStress: (
            dataFromServer.promStress - lastDataFromServer.promStress
          ).toFixed(2),
        });
      }

      // console.log(stadisticData);
    }
  }, [flag, id]);

  const [calm, setCalm] = useState();
  const [stress, setStress] = useState();
  const [differenceCalm, setDifferenceCalm] = useState();
  const [differenceStress, setDifferenceStress] = useState();
  const [differenceProm, setDifferenceProm] = useState();
  const [changeLabel, setChangeLabel] = useState("");

  useEffect(() => {
    // if (stadisticData && dataFromServer) {
    setCalm(dataFromServer.lSuperior);
    // setDifferenceCalm(stadisticData.lSuperior);

    setStress(dataFromServer.lInferior);
    // setDifferenceStress(stadisticData.lInferior);
    // }
  }, [dataFromServer]);

  useEffect(() => {
    if (dataFromServer && stadisticData) {
      switch (changeLabel) {
        case "calmProm":
          setCalm(dataFromServer.promCalm);
          // setDifferenceCalm(stadisticData.promCalm);
          break;

        case "calmSup":
          setCalm(dataFromServer.lSuperior);
          // setDifferenceCalm(stadisticData.lSuperior);

          break;

        case "stressProm":
          setStress(dataFromServer.promStress);
          // setDifferenceStress(stadisticData.promStress);

          break;

        case "stressInf":
          setStress(dataFromServer.lInferior);
          // setDifferenceStress(stadisticData.lInferior);

          break;

        default:
          break;
      }
    }
  }, [changeLabel]);
  const fakeInfo = {
    level: JSON.parse(randomStressChartValues(15, 5, 3)),
    // level: randomStressChartValues(15, 5, 3),
    extraValues: {
      prom: 6.2,
      limInf: 3.5,
      limSup: 8.9,
    },
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis non rhoncus eleifend. Suspendisse sit amet tristique ex. Vivamus vel sapien lorem. Nullam eu justo in eros aliquet consectetur et non dolor. Nunc elementum eleifend lacus non consequat. Nam at ipsum at odio fringilla finibus et ac risus. Nullam eget vestibulum leo. Vestibulum euismod arcu diam, in efficitur quam congue scelerisque. Aenean fringilla volutpat elementum. Nullam maximus ornare tincidunt. Aenean id semper risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec cursus, massa eget ultrices mattis, quam tellus dictum libero, eu euismod mi nunc varius nunc. Suspendisse fermentum elementum nunc, nec scelerisque justo. Aenean vehicula eros in ultricies blandit. In consectetur felis sed convallis semper. Vestibulum vel dolor leo. Etiam ut mi eget nisl varius pharetra eu et eros. Cras scelerisque dui mattis enim malesuada, at efficitur tellus commodo. Morbi sollicitudin rutrum enim, eget lacinia ligula. Vivamus id ipsum quis felis condimentum fermentum. Fusce sit amet ipsum sit amet mauris laoreet viverra. Quisque porta nec lorem quis imperdiet. Vestibulum rhoncus sed est a mollis. In gravida pharetra ex, vel tincidunt mauris accumsan quis. Vivamus eros justo, auctor id ligula quis, eleifend placerat augue. Donec mattis sodales dictum. Curabitur eleifend leo ligula, non cursus nisl ultrices eget. Vivamus semper justo sed facilisis laoreet. In non aliquet augue, et ornare augue. Suspendisse leo tortor, ornare quis sagittis vel, luctus id metus. Aenean quis lacus rutrum, venenatis elit ac, placerat arcu. Sed lectus ex, consectetur vitae volutpat quis, tristique quis augue. Integer eros massa, convallis vel egestas vitae, iaculis at lacus. Donec finibus velit eget interdum volutpat. Ut vitae leo lacus. Aliquam condimentum massa erat, vitae dictum ligula blandit in. Praesent et condimentum massa. Morbi condimentum turpis neque, nec rutrum urna rhoncus sit amet. Phasellus non bibendum ligula. Aliquam et dapibus orci, sit amet gravida enim. Sed aliquet pretium interdum. Nam sollicitudin elementum orci, vitae tempor dui interdum dapibus. Quisque tincidunt felis eget tortor hendrerit fringilla.",
  };

  // console.log(fakeInfo);

  const { level, extraValues, note } = fakeInfo;

  const handlerModal = () => {
    setTitleModal("Notas");
    setContentModal(<h1>{note}</h1>);
    setShowModal(true);
  };

  return (
    <div className="historialContainer">
      {dataFromServer && (
        <div className="historial">
          <div className="t1">
            <h1>Nivel de estrés detectado durante la sesión</h1>
          </div>
          <div className="stressChart">
            <div className="cl1">{chart}</div>
            <div className="cl2">
              <h1>mins</h1>
            </div>
          </div>
          <div className="extraInfo">
            <div className="cl4">
              <div className="title">
                <Icon
                  onClick={() => {
                    setChangeLabel("calmSup");
                  }}
                  circular
                  name="chevron up"
                />
                <h1 className="titleIn">Nivel Calma</h1>
                <Icon
                  circular
                  onClick={() => {
                    setChangeLabel("calmProm");
                  }}
                  name="chart bar outline"
                />
              </div>

              <div className="result">
                <h1 className="number">{calm}</h1>
                <h1 className="divider"> | </h1>
                <h1 className="negative">{differenceCalm}</h1>
              </div>
            </div>
            <div className="cl3">
              <h1 className="titlePromedio">Promedio General</h1>
              <div className="result">
                <h1 className="number">{dataFromServer.prom}</h1>
                <h1 className="divider"> | </h1>
                <h1 className="positive">{differenceProm}</h1>
              </div>
            </div>
            <div className="cl5">
              <div className="title">
                <Icon
                  onClick={() => {
                    setChangeLabel("stressInf");
                  }}
                  circular
                  name="chevron down"
                />
                <h1 className="titleIn">Nivel estrés</h1>
                <Icon
                  circular
                  onClick={() => {
                    setChangeLabel("stressProm");
                  }}
                  name="chart bar outline"
                />
              </div>
              <div className="result">
                <h1 className="number">{stress}</h1>
                <h1 className="divider"> | </h1>
                <h1 className="negative">{differenceStress}</h1>
              </div>
            </div>
          </div>
          <div className="t1">
            <h1>Notas</h1>
          </div>
          <div className="notes" onClick={() => handlerModal()}>
            <TextShown note={note} />
          </div>
        </div>
      )}

      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
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
