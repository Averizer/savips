import React, { useState } from 'react'
import AuthOptions from '../../components/Auth/AuthOptions'
import LoginForm from '../../components/Auth/LoginForm'
import RegisterForm from '../../components/Auth/RegisterForm'
import BackgroundInicio from '../../assets/png/background-inicio-sesion.png'
import logo from '../../assets/png/SAVIPS.png'
import './Auth.scss'
export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null)

  const handlerForm = () => {
    switch (selectedForm) {
      case 'login':
        return <LoginForm setSelectedForm={setSelectedForm} />
      case 'register':
        return <RegisterForm setSelectedForm={setSelectedForm} />
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />
    }
  }
  return (
    <div
      className="auth"
      style={{ backgroundImage: `url(${BackgroundInicio})` }}
    >
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={logo} alt="Logo de Savips" />
        </div>
        {handlerForm()}
      </div>
    </div>
  )
}
