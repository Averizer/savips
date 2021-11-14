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
  const { userInfo } = props;

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const [dataFromServer, setDataFromServer] = useState(null);
  const [lastDataFromServer, setlastDataFromServer] = useState(null);
  const [stadisticData, setStadisticData] = useState(null);
  const { id, paciente } = useParams();

  const [chart, setChart] = useState();

  useEffect(() => {
    if (id) {
      console.log("ID original: ", id);
      setStadisticData(null);
      fetchStadisticsSession(id, setDataFromServer);
    }
  }, [id]);

  const [nextId, setNextId] = useState(null);
  const [flag, setFlag] = useState(true);

  const fetchList = useCallback(async () => {
    await fetchSessionLastData(paciente, setNextId, setFlag, id);
  }, [userInfo, id]);

  useEffect(() => {
    fetchList();
  }, [userInfo, id]);

  useEffect(() => {
    if (nextId) {
      console.log("Se busca el ID que sigue: ", nextId);
      fetchStadisticsSession(nextId, setlastDataFromServer);
    }
  }, [nextId, id]);

  useEffect(() => {
    setDifferenceCalm(stadisticData ? stadisticData.lSuperior : "-");

    setDifferenceStress(stadisticData ? stadisticData.lInferior : "-");

    setDifferenceProm(stadisticData ? stadisticData.prom : "-");
  }, [stadisticData]);

  useEffect(() => {
    if (dataFromServer) {
      setCalm(dataFromServer.lSuperior);

      setStress(dataFromServer.lInferior);
    }
  }, [dataFromServer]);

  useEffect(() => {
    if (lastDataFromServer) {
      const aux = {
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
      };
      setStadisticData(aux);
      console.log("Estadisticas__: ", aux);

      setNextId(null);
    }
  }, [lastDataFromServer]);

  const [calm, setCalm] = useState();
  const [stress, setStress] = useState();
  const [differenceCalm, setDifferenceCalm] = useState();
  const [differenceStress, setDifferenceStress] = useState();
  const [differenceProm, setDifferenceProm] = useState();
  const [changeLabel, setChangeLabel] = useState("");

  useEffect(() => {
    if (dataFromServer) {
      setChart(<MainChart level={dataFromServer.level} />);
    }
  }, [dataFromServer]);

  useEffect(() => {
    switch (changeLabel) {
      case "calmProm":
        setCalm(dataFromServer.promCalm);
        setDifferenceCalm(stadisticData ? stadisticData.promCalm : "N/A");
        break;

      case "calmSup":
        setCalm(dataFromServer.lSuperior);
        setDifferenceCalm(stadisticData ? stadisticData.lSuperior : "N/A");

        break;

      case "stressProm":
        setStress(dataFromServer.promStress);
        setDifferenceStress(stadisticData ? stadisticData.promStress : "N/A");

        break;

      case "stressInf":
        setStress(dataFromServer.lInferior);
        setDifferenceStress(stadisticData ? stadisticData.lInferior : "N/A");

        break;

      default:
        break;
    }
  }, [changeLabel]);

  useEffect(() => {
    if (dataFromServer) {
    }
  }, [dataFromServer]);

  const handlerModal = () => {
    setTitleModal("Notas");
    setContentModal(<h1>Hola</h1>);
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
                {differenceCalm > 0 ? (
                  <h1 className="positive">{`+${differenceCalm}`}</h1>
                ) : (
                  <h1 className="negative">{differenceCalm}</h1>
                )}
              </div>
            </div>
            <div className="cl3">
              <h1 className="titlePromedio">Promedio General</h1>
              <div className="result">
                <h1 className="number">{dataFromServer.prom}</h1>
                <h1 className="divider"> | </h1>
                {differenceProm > 0 ? (
                  <h1 className="positive">{`+${differenceProm}`}</h1>
                ) : (
                  <h1 className="negative">{differenceProm}</h1>
                )}
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
                {differenceStress < 0 ? (
                  <h1 className="positive">{differenceStress}</h1>
                ) : (
                  <h1 className="negative">{`+${differenceStress}`}</h1>
                )}
              </div>
            </div>
          </div>
          <div className="notasComentarios">
            <div className="notesC" onClick={() => handlerModal()}>
              <h1 className="title">Notas</h1>
              <TextShown note={"note"} />
            </div>
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
  return <h1></h1>;
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
