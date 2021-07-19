import React, { useState } from 'react'
import firebase from './utils/firebase.js'
import 'firebase/auth'
import Auth from './pages/Auth'
import {  ToastContainer } from 'react-toastify'
import LoggedLayout from './Layouts/LoggedLayout/LoggedLayout.js'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
// eslint-disable-next-line
  const [reloadApp, setReloadApp] = useState(true)

  firebase.auth().onAuthStateChanged((currentUser) => {
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
      {!user ? (
        <Auth />
      ) : (
        <LoggedLayout user={user} setReloadApp={setReloadApp} />
      )}
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

export default App
