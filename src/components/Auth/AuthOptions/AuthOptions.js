import React from 'react'
import { Button } from 'semantic-ui-react'
import './AuthOptions.scss'

export default function AuthOptions(props) {
  const { setSelectedForm } = props
  console.log('Estamos en auth-options')
  return (
    <div className="auth-options">
      <h2>Inicia tu transformación aprendiendo a controlar tu estrés.</h2>
      <Button className="register" onClick={() => setSelectedForm('register')}>
        Registra tu cuenta
      </Button>
      <Button className="login" onClick={() => setSelectedForm('login')}>
        Inicia sesión
      </Button>
    </div>
  )
}
