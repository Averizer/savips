import { getPatientSessions } from "../utils/Api";

export async function fetchSessionLastData(email, setNextId, setFlag, id) {
  //   let calendarEvents = [];

  //   console.log("FUNCION FETCH CALL", userInfo);
  if (email) {
    let v = [];
    await getPatientSessions(email).then((res) => {
      res.forEach(async (doc) => {
        if (doc.data().estatus == "Finalizada") v.push(doc.id);
      });
      if (v.indexOf(id) > 0) {
        setNextId(v[v.indexOf(id) - 1]);
      } else {
        return null;
      }
      setFlag((v) => !v);
    });
  }
}
