import React from "react";
import { Grid } from "semantic-ui-react";
import MainChart from "./MainChart";

import "./Historial.scss";

export default function Historial() {
  return (
    <Grid className="historial">
      <Grid.Row className="t1">
        <h1>Nivel de estrés detectado durante la sesión</h1>
      </Grid.Row>
      <Grid.Row className="stressChart">
        <Grid.Column className="cl1" width={15}>
          <MainChart level={JSON.parse(randomStressChartValues(15, 5, 3))} />
        </Grid.Column>
        <Grid.Column className="cl2" width={1}>
          <h1>mins</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="extraInfo">
        <Grid.Column className="cl3" width={5}>
          <h1>Promedio</h1>
        </Grid.Column>
        <Grid.Column className="cl4" width={5}>
          <h1>Nivel mas alto</h1>
        </Grid.Column>
        <Grid.Column className="cl5" width={5}>
          <h1>Nivel mas bajo</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="t1">
        <h1>Notas</h1>
      </Grid.Row>
      <Grid.Row className="notes">
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pretium
          malesuada mauris, non porttitor massa fringilla non. Aliquam cursus
          risus vitae suscipit feugiat. Sed mattis mollis ligula. Duis tempus
          felis eu aliquam ultricies. Suspendisse venenatis tellus a tincidunt
          vestibulum. Sed elementum, sapien non tincidunt eleifend, purus eros
          rhoncus enim, id venenatis tortor tortor eget nibh. Mauris ornare
          ornare ...
        </h1>
      </Grid.Row>

      {/* <Grid.Row>
        <Grid.Column width={1}>
          <div>
            <h1>Nivel de estrés ó tranquilidad</h1>
          </div>
        </Grid.Column>
        <Grid.Column width={13}>
          <MainChart level={JSON.parse(randomStressChartValues(15, 5, 3))} />
        </Grid.Column>
        <Grid.Column width={1}>
          <div>
            <h1>Minutos</h1>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <h1> HOLAAAA</h1>
        </Grid.Column>
      </Grid.Row> */}
    </Grid>
  );
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
