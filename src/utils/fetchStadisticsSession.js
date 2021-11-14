import axios from "axios";

export default function fetchStadisticsSession(id, setDataFromServer) {
  if (id) {
    // console.log(id, paciente);
    axios.get(`http://localhost:8000/${id}`).then((res) => {
      // axios.get(`http://localhost:8000/OCBBE0I221R`).then((res) => {
      let level = [];
      let timestamp = 0;
      res.data.data.data.forEach((data) => {
        level.push({ timestap: timestamp, stress: data });
        timestamp++;
      });
      if (res) {
        setDataFromServer({
          level: level,
          lInferior: res.data.data.lInferior.toFixed(2),
          lSuperior: res.data.data.lSuperior.toFixed(2),
          prom: res.data.data.prom.toFixed(2),
          promCalm: res.data.data.promCalm.toFixed(2),
          promStress: res.data.data.promStress.toFixed(2),
        });
        // console.log(level);
      }
    });
  }
}
