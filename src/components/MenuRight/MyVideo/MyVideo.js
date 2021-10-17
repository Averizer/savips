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
          <Grid.Column className="cl1" width={16}>
            <MainChart mindWaves={array} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="chat">{/* <Mensajes /> */}</Grid.Row>
      </Grid>
      x
    </div>
  );
}
