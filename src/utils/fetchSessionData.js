import { getTherapistSessions, verifyPacient } from "../utils/Api";
import { format } from "date-fns";

export async function fetchSessionData(userInfo, setSessionList, setFlag) {
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
            const data = {
              title: res.data().nombre,
              start: horaInit,
              end: horaEnd,
              id: doc.id,
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
    }
  }
}
