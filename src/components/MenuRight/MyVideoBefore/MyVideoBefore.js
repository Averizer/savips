import React from "react";
import { Grid, Form, Input, Button } from "semantic-ui-react";

export default function MyVideoBefore() {
  return (
    <div className="notificaciones">
      <Grid className="variables">
        <Grid.Row className="t1">
          <h1>Estamos por comenzar...</h1>
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
