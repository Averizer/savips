import React from "react";
import { Grid } from "semantic-ui-react";
import Mensajes from "../../../pages/Mensajes";

import MainChart from "./MainChart/MainChart";

import "./MyVideo.scss";

let array = [];

export default function MyVideo(props) {
  const { data } = props;
  if (array.length > 10) {
    array.shift();
  }
  array.push(data);
  return (
    <div className="notificaciones">
      <Grid className="variables">
        <Grid.Row className="t1">
          <h1>Nivel de Estrés</h1>
        </Grid.Row>
        <Grid.Row className="stressChart">
          <Grid.Column className="cl1" width={18}>
            <MainChart mindWaves={array} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="chat">
          <Mensajes />
          {/* <Grid.Column className="cl3">
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
          </Grid.Column> */}
        </Grid.Row>
        {/* <Grid.Row className="t1">
          <h1>Notas</h1>
        </Grid.Row>
        <Grid.Row className="notes" onClick={() => handlerModal()}>
          <TextShown note={note} />
        </Grid.Row>  */}
      </Grid>
      x
    </div>
  );
}
