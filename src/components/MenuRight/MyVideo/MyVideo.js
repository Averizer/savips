import React, { useState, useEffect } from "react";
import { Grid, Form, Input, Button } from "semantic-ui-react";
import Mensajes from "../../../pages/Mensajes";

import MainChart from "./MainChart/MainChart";

import "./MyVideo.scss";
let array = [];
let result = [];
export default function MyVideo(props) {
  const { data, setVideId, setNotificationHide } = props;

  const [lSuperior, setLSuperior] = useState("-");
  const [lInferior, setLInferior] = useState("-");
  const [calmProm, setCalmProm] = useState("-");
  const [stressProm, setStressProm] = useState("-");
  const [prom, setProm] = useState("-");

  // const [result, setResult] = useState([]);

  // setResult((v) => [...v, data]);

  useEffect(() => {
    if (array.length > 10) {
      array.shift();
    }
    array.push(!isNaN(data) && data);
    result.push(!isNaN(data) && data);

    if (result.length > 0) {
      const prom = (result) => {
        let promedio = 0;
        result.forEach((value) => {
          if (value) {
            promedio += value;
          }
        });
        return (promedio / result.length).toFixed(2);
      };

      const promCalm = (result) => {
        let promedio = 0;
        let cont = 0;
        result.forEach((value) => {
          if (value > 0) {
            promedio += value;
            cont++;
          }
          // console.log(promedio);
        });
        return (promedio / cont).toFixed(2);
      };

      const promStress = (result) => {
        let promedio = 0;
        let cont = 0;
        result.forEach((value) => {
          if (value < 0) {
            promedio += value;
            cont++;
          }
          // console.log(promedio);
        });
        return (promedio / cont).toFixed(2);
      };

      const lSuperior = (result) => {
        return Math.max(...result).toFixed(2);
      };

      const lInferior = (result) => {
        return Math.min(...result).toFixed(2);
      };

      setProm(prom(result));
      setCalmProm(promCalm(result));
      setStressProm(promStress(result));
      setLSuperior(lSuperior(result));
      setLInferior(lInferior(result));
    }
  }, [data]);

  return (
    <div className="notificaciones">
      <Grid className="variables">
        <Grid.Row className="t1">
          <h1>Gráfica</h1>
        </Grid.Row>
        <Grid.Row className="stressChart">
          <Grid.Column className="cl1">
            <MainChart mindWaves={array} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="t1">
          <h1>Datos Generales</h1>
        </Grid.Row>
        <Grid.Row className="params">
          <div className="divider"></div>
          <div className="container">
            <div className="card">
              <h1 className="text">Nivel máximo Calma</h1>
              <h1 className="info">{lSuperior}</h1>
            </div>
            <div className="card">
              <h1 className="text">Nivel máximo Estrés</h1>
              <h1 className="info">{lInferior}</h1>
            </div>

            <div className="card">
              <h1 className="text">Promedio Calma</h1>
              <h1 className="info">{calmProm}</h1>
            </div>
            <div className="card">
              <h1 className="text">Promedio Estrés</h1>
              <h1 className="info">{stressProm}</h1>
            </div>
            <div className="card">
              <h1 className="text">Promedio General</h1>
              <h1 className="info">{prom}</h1>
            </div>
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
}
