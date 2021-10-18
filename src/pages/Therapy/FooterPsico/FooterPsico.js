import React, { useContext, useState, useEffect } from "react";
import { Button, TextArea, Form, Transition } from "semantic-ui-react";
import { SocketContext } from "../../../utils/ServerIO";
import ListVideos from "../../../components/ListVideos/ListVideos";

const FooterPsico = (props) => {
  const { callAccepted, callEnded, callUser, guess } =
    useContext(SocketContext);
  const { setNoteVisible, noteVisible, noteContent, setNoteContent, userInfo } =
    props;
  const [button, setButton] = useState(false);
  const [pacienteId, setPacienteId] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (guess) {
      setPacienteId(guess);
      setButton(false);
    } else {
      setButton(true);
    }
  }, [guess, callAccepted, callEnded]);

  return (
    <div className="footerTherapy">
      {!callAccepted && !callEnded ? (
        <Button
          className="button"
          disabled={button}
          onClick={() => {
            callUser(pacienteId);
          }}
          loading={loading}
        >
          Iniciar Sesión
        </Button>
      ) : (
        <div>
          <Transition
            visible={noteVisible}
            animation="slide up"
            duration={{ hide: 0, show: 500 }}
          >
            <div>
              <Button
                className="button-note"
                onClick={() => {
                  setNoteVisible((state) => !state);
                }}
              >
                Notas
              </Button>
              <Form className="note-content">
                <TextArea
                  placeholder="Escribe tus notas aquí..."
                  onChange={(e, { value }) => setNoteContent(value)}
                  value={noteContent}
                  className="note-content-text"
                  rows={12}
                />
                <div className="videos">
                  <ListVideos userInfo={userInfo} />
                </div>
              </Form>
            </div>
          </Transition>
          <Transition
            visible={!noteVisible}
            animation="slide up"
            duration={{ hide: 0, show: 500 }}
          >
            <Button
              className="button-note"
              onClick={() => {
                setNoteVisible((state) => !state);
              }}
            >
              Herramientas
            </Button>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default FooterPsico;
