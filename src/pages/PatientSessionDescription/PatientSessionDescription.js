import React, { useState, useEffect, useCallback } from "react";
import { Icon, Form, TextArea } from "semantic-ui-react";
import MainChart from "./MainChart";

import { useParams } from "react-router-dom";

import BasicModal from "../../components/Modal/BasicModal/BasicModal";

import { fetchSessionLastData } from "../../utils/fetchLastSessionData";

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
      // console.log("ID original: ", id);
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
      // console.log("Se busca el ID que sigue: ", nextId);
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
      // console.log("Estadisticas__: ", aux);

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

  const handlerModal = () => {
    setTitleModal(userInfo.role === "psicologo" ? "Notas" : "Comentarios");
    setContentModal(<h1>{noteContent}</h1>);
    setShowModal(true);
  };

  /**
   * SE OBTIENEN LOS DATOS DE LA NOTA
   */

  const [noteContent, setNoteContent] = useState(
    "Comprender textos, desde una perspectiva psicológica, Comprender textos, desde una perspectiva psicológica, Comprender textos, desde una perspectiva psicológica, Comprender textos, desde una Comprender textos, desde una perspectiva psicológica, Comprender textos, desde una perspectiva psicológica, perspectiva psicológica, supone más que una tarea lingüística de   decodificación de signos escritos en unidades semánticas, pues en la estructura superficial del texto no se explicitan todos los elementos necesarios para su comprensión. La tarea del lector consiste en ir más allá de los signos verbales, esto es, crear y reconstruir informaciones que llenen los “vacíos” dejados por los signos escritos, con el fin de recrear en la mente el significado del texto. En consecuencia, Walter Kintch (1988) ha propuesto un modelo que tiene en cuenta las actividades que el sujeto realiza cuando comprende un texto, la estructura que subyace al texto y la integraci"
  );

  useEffect(async () => {
    await getTherapySession(id).then((res) => {
      if (userInfo.role === "psicologo") {
        setNoteContent(res.data().nota);
      } else {
        setNoteContent(res.data().comentario);
      }
    });
  }, [id]);

  return (
    <div className="historialContainer">
      {dataFromServer && userInfo && (
        <div className="historial">
          <div className="t1">
            <h1>Nivel de calma/estrés detectado durante la sesión</h1>
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
            <div className="notesC">
              <h1 className="title" onClick={() => handlerModal()}>
                {userInfo.role === "psicologo" ? "Notas" : "Comentarios"}
              </h1>
              {/* <TextShown note={"note"} /> */}
              <Form className="note-content ">
                <TextArea
                  placeholder={`No hubo ${
                    userInfo.role === "psicologo" ? "notas" : "comentarios"
                  } para esta sesión...`}
                  // onChange={(e, { value }) => setNoteContent(value)}
                  value={noteContent}
                  className="note-content-text scroll"
                  rows={4}
                  disabled
                />
              </Form>
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

// function TextShown(note) {
//   let finalText = "";
//   for (let i = 0; i < 375; i++) {
//     finalText += note.note[i];
//   }
//   return <h1></h1>;
// }

// let lastSec = 2;
// const randomStressChartValues = (minutes, timelapse, factor) => {
//   let data = '{"jsonarray":[';
//   let timestap = minutes * (60 / timelapse);
//   for (let i = 0; i < timestap; i++) {
//     let lowerLimit = lastSec - factor;
//     let upperLimit = lastSec + factor;

//     let stress = Math.random() * (upperLimit - lowerLimit) + lowerLimit;

//     data += `{"timestap":${((i * timelapse) / 60).toFixed(
//       1
//     )}, "stress": ${stress}},`;
//     if (i === timestap - 1) {
//       data += `{"timestap": ${minutes}, "stress": ${stress}}`;
//     }
//     lastSec = stress;
//   }
//   data += "]}";
//   return data;
// };
