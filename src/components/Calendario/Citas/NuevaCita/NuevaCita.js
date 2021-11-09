import React, { useState } from "react";

import { addEvent, auth, db } from "../../../../utils/Api";
import { Button } from "semantic-ui-react";
import "./NuevaCita.scss";
import { toast } from "react-toastify";

import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import esLocaleDatePicker from "date-fns/locale/es";
// import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

export default function NuevaCita(props) {
  const { setShowModal, setReloadApp, setCalendarEvents } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, handleDateChange] = useState(
    format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss")
  );

  const addAppointment = async () => {
    setIsLoading(true);
    console.log("La fecha ha sido agregada");
    addEvent({
      titulo: `Cita con ${auth.currentUser.displayName}`,
      hora: selectedDate,
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setShowModal(false);
      })
      .finally(() => {
        let v = [];
        const docRef = db
          .collection("pacientes")
          .doc(auth.currentUser.email)
          .collection("calendario");
        docRef
          .get()
          .then((collection) => {
            collection.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots

              const inicio = doc.data().hora.seconds * 1000;
              const titulo = doc.data().titulo;
              const hora = format(inicio, "yyyy-MM-dd'T'HH:mm:ss");
              const data = { title: titulo, start: hora };
              v.push(data);
            });
          })
          .finally(() => {
            setCalendarEvents(v);
          });

        setShowModal(false);
      });
    setShowModal(false);
  };

  const handleDateClick = (dateInfo) => {
    handleDateChange(dateInfo);
  };
  const dateClick = (dateInfo) => {
    console.log(selectedDate);
  };
  return (
    <div className="nuevacita">
      <h1>Selecciona fecha y hora.</h1>
      <div className="date-picker">
        {/* <MuiPickersUtilsProvider
          locale={esLocaleDatePicker}
          utils={DateFnsUtils}
        >
          <DateTimePicker value={selectedDate} onChange={handleDateClick} />
        </MuiPickersUtilsProvider> */}
      </div>
      <Button onClick={addAppointment}>ACEPTAR</Button>
    </div>
  );
}
