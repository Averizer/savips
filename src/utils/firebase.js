import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAXLN9GuoyPdqJrntBTVaK-S58X_BNNEfU',
  authDomain: 'savips-9083b.firebaseapp.com',
  databaseURL: 'https://savips-9083b-default-rtdb.firebaseio.com',
  projectId: 'savips-9083b',
  storageBucket: 'savips-9083b.appspot.com',
  messagingSenderId: '179045486433',
  appId: '1:179045486433:web:697dfa058925c1ae3aff20',
  measurementId: 'G-LJNFSHEBF7',
}
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig)
