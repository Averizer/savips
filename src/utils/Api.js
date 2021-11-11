import firebaseApp from "./firebase";
import "firebase/firestore";

export const db = firebaseApp.firestore(firebaseApp);

export const auth = firebaseApp.auth();

export async function isUserAdmin(uid) {
  const response = await db.collection("psicologo").doc(uid).get();
  return response.exists;
}
//Ok
export async function verifyPsico(email) {
  const verifyPsico = await db.collection("psicologo").doc(email).get();
  return verifyPsico;
}

export async function verifyPacient(email) {
  const verifyPacient = await db.collection("paciente").doc(email).get();
  return verifyPacient;
}
//OK
export async function getTherapisName(email) {
  const response = await db.collection("paciente").doc(email).get();
  return response;
}
//Ok
export async function updateTherapistOfPatient(
  emailTherapist,
  emailPatient,
  therapistName
) {
  const response = db
    .collection("paciente")
    .doc(emailPatient)
    .update({ emailpsico: emailTherapist, nombrepsicologo: therapistName });
  return response;
}

/*--------------------------PatientList-------------------------- */

export async function addPatientList(
  emailTherapist,
  emailPatient,
  namePatient
) {
  const response = db
    .collection("psicologo")
    .doc(emailTherapist)
    .collection("pacientes")
    .doc(emailPatient)
    .set({ emailpatient: emailPatient, nombrepatient: namePatient });
  return response;
}

export async function removePatientList(emailTherapist, emailPatient) {
  const doc = await db
    .collection("psicologo")
    .doc(emailTherapist)
    .collection("pacientes")
    .doc(emailPatient)
    .get();

  doc.ref.delete();

  return doc;
}

export async function getPatientList(emailTherapist) {
  const getPatientList = await db
    .collection("psicologo")
    .doc(emailTherapist)
    .collection("pacientes")
    .get();

  return getPatientList.docs.map((doc) => doc.data());
}

/*-------------------------------------------------------------- */

/*--------------------------SessionPatientList-------------------------- */

//getTherapySession
export async function getSessionPatientList(emailPatient) {
  const getSessionPatientList = await db
    .collection("sesion_terapia")
    .where("paciente", "==", emailPatient)
    .orderBy("time", "asc")
    .get();

  return getSessionPatientList.docs.map((doc) => doc);
}

//addTherapySession
export async function addTherapySession(
  emailTherapist,
  emailPatient,
  dataInit,
  dataEnd,
  sessionId
) {
  const response = db.collection("sesion_terapia").doc(sessionId).set({
    estatus: "Agendada",
    paciente: emailPatient,
    psicologo: emailTherapist,
    time: dataInit,
    timeEnd: dataEnd,
    comentario: "",
    nota: "",
    promedio: "",
    linferior: "",
    lsuperior: "",
  });
  return response;
}

//deleteTherapySession

export async function removeTherapySession(sessionId) {
  // const response = db.collection("sesion_terapia").doc(sessionId).update({
  //   estatus: "Cancelada",
  // });
  const response = await db.collection("sesion_terapia").doc(sessionId).get();
  response.ref.delete();
  return response;
}

/*-------------------------------------------------------------- */

//OK
export async function registrarUsuario(uid, formData) {
  await db
    .collection("paciente")
    .doc(uid)
    .set({ ...formData, role: "paciente", nombrepsicologo: "" });
}
//OK
export const reauthenticate = (password) => {
  const user = firebaseApp.auth().currentUser;
  const credentials = firebaseApp.firebase_.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(credentials);
};

/*--------------------------THERAPY-------------------------- */

//updateTherapySession

export async function updateTherapySession(idSession, data) {
  const response = await db.collection("sesion_terapia").doc(idSession).update({
    nota: data.note,
    comentario: data.comment,
    estatus: "Finalizada",
  });
  return response;
}

export async function updateTherapySessionExpired(idSession, data) {
  const response = await db.collection("sesion_terapia").doc(idSession).update({
    nota: data.note,
    comentario: data.comment,
    estatus: "Expirada",
  });
  return response;
}

//getTherapySession
export async function getTherapySession(idSession) {
  const getTherapySession = await db
    .collection("sesion_terapia")
    // .where("id", "==", idSession)
    // .orderBy("time");
    .doc(idSession)
    .get();
  return getTherapySession;
}

/*------------------------------------VIDEOS----------------------------------------*/

export async function getVideos(emailUser) {
  const getVideos = await db
    .collection("psicologo")
    .doc(emailUser)
    .collection("video")
    .get();
  return getVideos.docs.map((doc) => doc.data());
}

export async function addVideo(emailUser, video) {
  const addVideo = await db
    .collection("psicologo")
    .doc(emailUser)
    .collection("video")
    .doc(video.videoId)
    .set({
      id: video.videoId,
      title: video.title,
      description: video.description,
    });
  return addVideo;
}

export async function deleteVideo(emailUser, videoId) {
  const doc = await db
    .collection("psicologo")
    .doc(emailUser)
    .collection("video")
    .doc(videoId)
    .get();

  doc.ref.delete();

  return doc.data();
}

/*----------------------------------CALENDAR-------------------------------------- */

export async function getTherapistSessions(emailTherapist) {
  const response = await db
    .collection("sesion_terapia")
    .where("psicologo", "==", emailTherapist)
    .orderBy("time", "asc")
    .get();
  return response;
}

export async function getPatientSessions(emailPatient) {
  const response = await db
    .collection("sesion_terapia")
    .where("paciente", "==", emailPatient)
    .orderBy("time", "asc")
    .get();
  return response;
}

export async function updateUserName(userName, emailUser, role) {
  const response = await db
    .collection(role)
    .doc(emailUser)
    .update({ nombre: userName });
  return response;
}

export async function updateEmail(email, emailUser, role) {
  const response = await db
    .collection(role)
    .doc(emailUser)
    .update({ email: email });
  return response;
}

export async function updatePass(password, emailUser, role) {
  const response = await db
    .collection(role)
    .doc(emailUser)
    .update({ password: password });
  return response;
}

export async function updatePsico(emailUser, role) {
  const response = await db
    .collection(role)
    .doc(emailUser)
    .update({ nombrepsicologo: "" });
  return response;
}

/*--------------------------------------------------------------------------------- */
//OK
export const getEvent = async () => {
  const userEmail = firebaseApp.auth().currentUser.email;
  let events = {};
  console.log(userEmail);
  const docRef = db
    .collection("pacientes")
    .doc(userEmail)
    .collection("calendario");

  await docRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const id = doc.id;
        const inicio = doc.data().hora.seconds;
        const titulo = doc.data().titulo;
        const data = { id: id, title: titulo, start: inicio };
        events = { ...events, data };
        console.log(events);
      });
      return events;
    })
    .catch((error) => {
      console.log("Error obteniendo el documento:", error);
    });
};

export const addEvent = async (object) => {
  console.log("agregando evento");
  const userEmail = auth.currentUser.email;
  await db
    .collection("pacientes")
    .doc(userEmail)
    .collection("calendario")
    .add(object);
};
