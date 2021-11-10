import React, { useEffect, useState } from "react";
import { getSessionPatientList } from "../../utils/Api";
import {
  Icon,
  List,
  Label,
  Button,
  Input,
  Transition,
} from "semantic-ui-react";

import { addTherapySession } from "../../utils/Api";

import ListSessionPatientItem from "./ListSessionPatientItem/ListSessionPatientItem";

import { toast } from "react-toastify";
import "./ListSessionPatient.scss";

export default function ListSessionPatient(props) {
  const { patient, userInfo, setReloadApp, changeItem } = props;

  const [sessionsDB, setSessionsDB] = useState(null);
  const [listSessionPatient, setlistSessionPatient] = useState(null);

  const [addSessionRefresh, setAddSessionRefresh] = useState();

  const [addSession, setAddSession] = useState(false);

  useEffect(async () => {
    // console.log(patient.emailpatient);
    await getSessionPatientList(patient.emailpatient).then((res) => {
      setSessionsDB(res);
    });
  }, [addSessionRefresh, patient.nombrepatient]);

  useEffect(() => {
    if (sessionsDB) {
      setlistSessionPatient(
        sessionsDB.map((sessionsDB) => (
          <ListSessionPatientItem
            session={sessionsDB}
            setAddSessionRefresh={setAddSessionRefresh}
          />
        ))
      );
    }
  }, [sessionsDB, addSessionRefresh, patient.nombrepatient]);

  return (
    <div className="listSession">
      <div className="topTitle">
        <h1 className="title1">{patient.nombrepatient}</h1>
        <Icon
          name="add circle"
          size="big"
          onClick={() => {
            setAddSession((state) => !state);
          }}
        />
      </div>

      <AddSession
        userInfo={userInfo}
        patient={patient}
        setReloadApp={setReloadApp}
        setAddSessionRefresh={setAddSessionRefresh}
        addSession={addSession}
        setAddSession={setAddSession}
      />

      {sessionsDB && (
        <List selection verticalAlign="middle" size="large">
          {listSessionPatient}
        </List>
      )}
    </div>
  );
}

function AddSession(props) {
  const { userInfo, patient, setAddSessionRefresh, addSession, setAddSession } =
    props;
  const [formData, setFormData] = useState({
    fecha: "",
    de: "",
    a: "",
  });

  const onSubmit = async () => {
    const dateInit = new Date(formData.fecha + "T" + formData.de);
    const dateEnd = new Date(formData.fecha + "T" + formData.a);

    let sessionId = Math.random().toString(36).substring(2).toUpperCase();
    setAddSessionRefresh((state) => !state);
    setAddSession((state) => !state);

    await addTherapySession(
      userInfo.email,
      patient.emailpatient,
      dateInit,
      dateEnd,
      sessionId
    )
      .then((res) => {
        toast.success("Sesion agendada correctamente");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Transition
        visible={addSession}
        animation="drop"
        duration={{ hide: 0, show: 400 }}
      >
        <div className="addSessionWrapper">
          <div className="addSession">
            <div className="join">
              <Label className="dateLabel">
                <p>
                  <Input
                    className="date"
                    placeholder="dd/mm/aa"
                    type="date"
                    onChange={(e) =>
                      setFormData({ ...formData, fecha: e.target.value })
                    }
                  />
                </p>
              </Label>
              <div className="divierInfo" />
              <Label className="dateLabelTime">
                <p>
                  <Input
                    className="time"
                    placeholder="hrs:mins"
                    type="time"
                    onChange={(e) =>
                      setFormData({ ...formData, de: e.target.value })
                    }
                  />
                </p>
              </Label>
              -
              <Label className="dateLabelTime">
                <p>
                  <Input
                    className="time"
                    placeholder="hrs:mins"
                    type="time"
                    onChange={(e) =>
                      setFormData({ ...formData, a: e.target.value })
                    }
                  />
                </p>
              </Label>
            </div>
            <div className="joinButton">
              <Button
                onClick={() => {
                  onSubmit();
                }}
                className="buttonInfo"
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
