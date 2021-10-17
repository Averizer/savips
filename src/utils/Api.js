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

//updateInfo

export async function updateUserName(userName, emailUser, role) {
  const response = db
    .collection(role)
    .doc(emailUser)
    .update({ nombre: userName });
  return response;
}

export async function updateEmail(email, emailUser, role) {
  const response = db.collection(role).doc(emailUser).update({ email: email });
  return response;
}

export async function updatePass(password, emailUser, role) {
  const response = db
    .collection(role)
    .doc(emailUser)
    .update({ password: password });
  return response;
}

export async function updatePsico(emailUser, role) {
  const response = db
    .collection(role)
    .doc(emailUser)
    .update({ nombrepsicologo: "" });
  return response;
}
