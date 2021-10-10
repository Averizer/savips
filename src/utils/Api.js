import firebaseApp from './firebase'
import 'firebase/firestore'

export const db = firebaseApp.firestore(firebaseApp)

export const auth = firebaseApp.auth()

export async function isUserAdmin(uid) {
  const response = await db.collection('psicologos').doc(uid).get()
  return response.exists
}
//Ok
export async function therapistExistace(email) {
  const therapistExistace = await db.collection('psicologos').doc(email).get()
  return therapistExistace
}

export async function verifyTherapistHaving(email) {
  const response = await db.collection('pacientes').doc(email).get()
  return response
}
//OK
export async function getTherapisName(email) {
  const response = await db.collection('pacientes').doc(email).get()
  return response
}
//Ok
export async function updateTherapistOfPatient(
  emailTherapist,
  emailPatient,
  therapistName,
) {
  const response = db
    .collection('pacientes')
    .doc(emailPatient)
    .update({ psicologo: emailTherapist, nombrepsicologo: therapistName })
  return response
}
//OK
export async function registrarUsuario(uid, formData) {
  await db
    .collection('pacientes')
    .doc(uid)
    .set({ ...formData, psicologo: '' })
}
//OK
export const reauthenticate = (password) => {
  const user = firebaseApp.auth().currentUser
  const credentials = firebaseApp.firebase_.auth.EmailAuthProvider.credential(
    user.email,
    password,
  )
  return user.reauthenticateWithCredential(credentials)
}
//OK
export const getEvent = async () => {
  const userEmail = firebaseApp.auth().currentUser.email
  let events = {}
  console.log(userEmail)
  const docRef = db
    .collection('pacientes')
    .doc(userEmail)
    .collection('calendario')

  await docRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const id = doc.id
        const inicio = doc.data().hora.seconds
        const titulo = doc.data().titulo
        const data = { id: id, title: titulo, start: inicio }
        events = { ...events, data }
        console.log(events)
      })
      return events
    })
    .catch((error) => {
      console.log('Error obteniendo el documento:', error)
    })
}

export const addEvent = async (object) => {
  console.log('agregando evento')
  const userEmail = auth.currentUser.email
  await db
    .collection('pacientes')
    .doc(userEmail)
    .collection('calendario')
    .add(object)
}
