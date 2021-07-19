import firebaseApp from './firebase'
import 'firebase/firestore'

export const db = firebaseApp.firestore(firebaseApp)

export async function isUserAdmin(uid) {
  const response = await db.collection('psicologos').doc(uid).get()
  return response.exists
}

export async function verifyIfTherapist(correo) {
  const response = await db.collection('pacientes').doc(correo).get()
  return response
}

export async function registrarUsuario(uid, formData) {
  db.collection('pacientes')
    .doc(uid)
    .set({ ...formData, psicologo: 'pscicologo' })
}
