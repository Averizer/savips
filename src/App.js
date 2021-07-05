import React, { useState } from 'react'
import firebase from './utils/firebase.js'
import 'firebase/auth'
import Auth from './pages/Auth'
import { toast, ToastContainer } from 'react-toastify'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  firebase.auth().onAuthStateChanged((currentUser) => {
    console.log(currentUser)
    if (!currentUser?.emailVerified) {
      firebase.auth().signOut()
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setIsLoading(false)
  })

  if (isLoading) {
    return null
  }

  return (
    <>
      {!user ? <Auth /> : <UserLogged />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </>
  )
}

function UserLogged() {
  const logout = () => {
    firebase.auth().signOut()
  }

  toast('Bienvenido!')

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <h1>Usuario loggeado</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  )
}
export default App
