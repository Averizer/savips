import {
  getTherapistSessions,
  verifyPacient,
  getPatientSessions,
} from "../utils/Api";
import { format } from "date-fns";

export async function fetchSessionData(
  userInfo,
  setSessionList,
  setFlag,
  calendario
) {
  //   let calendarEvents = [];

  //   console.log("FUNCION FETCH CALL", userInfo);
  if (userInfo.email) {
    if (userInfo.role === "psicologo") {
      await getTherapistSessions(userInfo.email).then((res) => {
        res.forEach(async (doc) => {
          const inicio = doc.data().time.seconds * 1000;
          const fin = doc.data().timeEnd.seconds * 1000;
          const horaInit = format(inicio, "yyyy-MM-dd'T'HH:mm:ss");
          const horaEnd = format(fin, "yyyy-MM-dd'T'HH:mm:ss");
          await verifyPacient(doc.data().paciente).then((res) => {
            let name;
            if (calendario) {
              name =
                res.data().nombre[0] + ". " + res.data().nombre.split(" ")[1];
            } else {
              name = res.data().nombre;
            }
            const data = {
              className: "scheduler_basic_event",
              title: name,
              start: horaInit,
              end: horaEnd,
              id: doc.id,
              color:
                doc.data().estatus === "Finalizada" ? "#bd8ebf" : "#2dc45f",
              status: doc.data().estatus,
            };
            // console.log("ITEM: ", data);
            setSessionList((array) => [...array, data]);
            // calendarEvents.push(data);
          });
          setFlag((v) => !v);
        });

        // setFlag((state) => !state);
        // console.log("DESDE FETCH", setSessionList);
        // return calendarEvents;
      });
    } else {
      await getPatientSessions(userInfo.email).then((res) => {
        res.forEach(async (doc) => {
          const inicio = doc.data().time.seconds * 1000;
          const fin = doc.data().timeEnd.seconds * 1000;
          const horaInit = format(inicio, "yyyy-MM-dd'T'HH:mm:ss");
          const horaEnd = format(fin, "yyyy-MM-dd'T'HH:mm:ss");

          let name;
          if (calendario) {
            name =
              userInfo.nombrepsicologo[0] +
              ". " +
              userInfo.nombrepsicologo.split(" ")[1];
          } else {
            name = userInfo.nombrepsicologo;
          }
          const data = {
            title: name,
            start: horaInit,
            end: horaEnd,
            id: doc.id,
            color: doc.data().estatus === "Finalizada" ? "#bd8ebf" : "#2dc45f",
            status: doc.data().estatus,
          };
          // console.log("ITEM: ", data);
          setSessionList((array) => [...array, data]);
          // calendarEvents.push(data);
        });
        setFlag((v) => !v);
      });
    }
  }
}
