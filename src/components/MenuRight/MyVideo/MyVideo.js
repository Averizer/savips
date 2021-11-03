import React, { useState } from "react";
import { Grid, Form, Input, Button } from "semantic-ui-react";
// import Mensajes from "../../../pages/Mensajes";

import MainChart from "./MainChart/MainChart";

import "./MyVideo.scss";

let array = [];

export default function MyVideo(props) {
  const { data, setVideId } = props;

  // const [formData, setFormData] = useState(defaultValueForm());

  if (array.length > 10) {
    array.shift();
  }
  array.push(data);

  // const onChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onSubmit = () => {
  //   setVideId(formData.videoId);
  // };

  return (
    <div className="notificaciones">
      <Grid className="variables">
        <Grid.Row className="t1">
          <h1>Nivel de Estrés</h1>
        </Grid.Row>
        <Grid.Row className="stressChart">
          <Grid.Column className="cl1">
            <MainChart mindWaves={array} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="chat">{/* <Mensajes /> */}</Grid.Row>

        {/* <Form onSubmit={onSubmit} onChange={onChange}>
          <Form.Field>
            <Input
              type="text"
              name="videoId"
              placeholder="Correo electrónico"
              icon="angle right"
            />
          </Form.Field>
          <Button type="submit">Enviar</Button>
        </Form> */}
      </Grid>
    </div>
  );
}

// function defaultValueForm() {
//   return {
//     videoId: "",
//   };
// }
