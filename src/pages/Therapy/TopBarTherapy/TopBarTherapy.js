import React, { useState, useEffect, useContext } from "react";
import { Grid, Button, Form, TextArea } from "semantic-ui-react";
import { SocketContext } from "../../../utils/ServerIO";
import { updateTherapySession } from "../../../utils/Api";
import { toast } from "react-toastify";
import { verifyPsico, verifyPacient } from "../../../utils/Api";

export default function TopBar(props) {
  const {
    userInfo,
    setTitleModal,
    setContentModal,
    setShowModal,
    noteContent,
    sessionInfo,
  } = props;
  const { leaveCall, callAccepted, callEnded, call } =
    useContext(SocketContext);

  const [name, setName] = useState("");
  const [joinButton, setJoinButton] = useState(false);
  const [commentsPacient, setCommentsPacient] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (userInfo.role === "psicologo") {
      await verifyPacient(sessionInfo.paciente).then((res) => {
        if (res.data()) {
          setName(res.data().nombre);
        }
      });
    } else {
      await verifyPsico(sessionInfo.psicologo).then((res) => {
        if (res.data()) {
          setName(res.data().nombre);
        }
      });
    }
  }, [sessionInfo]);

  useEffect(() => {
    if (call.isReceivingCall) {
      setJoinButton(true);
    } else {
      setJoinButton(false);
    }
  }, [call.isReceivingCall, callAccepted]);

  useEffect(() => {
    setContentModal(
      <Form className="note-content">
        <Form.Field>
          <TextArea
            placeholder="Escribe tus notas aquí..."
            onChange={(e, { value }) => {
              setCommentsPacient(value);
            }}
            rows={5}
          />
        </Form.Field>
        <Button
          onClick={() => {
            onSubmit();
          }}
          loading={loading}
        >
          Enviar Nota
        </Button>
      </Form>
    );
  }, [commentsPacient]);

  const getInitials = (nombre) => {
    if (nombre)
      return nombre
        .split(" ")
        .map((n) => n[0])
        .join("");
  };

  const onSubmit = async () => {
    setShowModal(false);
    setLoading(true);

    await updateTherapySession(sessionInfo.id, {
      note: noteContent,
      comment: commentsPacient,
    })
      .then((res) => {
        toast.success("Información guardada exitosamente");
        setLoading(false);
      })
      .catch((e) => console.log(e));

    // window.location.reload(true);
    window.location.href = "http://localhost:3000/TherapyConfig";
  };

  const handlerModal = () => {
    setTitleModal("Observaciones al Paciente");
    setShowModal(true);
  };

  return (
    <Grid className="gridTop">
      <Grid.Row className="topBar">
        <Grid.Column className="c1">
          <h1 className="t1">{getInitials(name)}</h1>
          <Grid.Column className="c2">
            <h1 className="t2">{name}</h1>
          </Grid.Column>
        </Grid.Column>
        {userInfo.role === "paciente" && !callAccepted && (
          <Grid.Column
            className="c3"
            onClick={() => {
              window.location.reload();
            }}
          >
            <Button className="t3" disabled={joinButton}>
              Solicitar unirse
            </Button>
          </Grid.Column>
        )}
        {userInfo.role === "psicologo" && callAccepted && !callEnded && (
          <Grid.Column
            className="c3"
            onClick={() => {
              leaveCall();
              handlerModal();
            }}
          >
            <h1 className="t3">Terminar Sesión</h1>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
}
