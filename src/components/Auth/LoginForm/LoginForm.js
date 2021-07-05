import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { validateEmail } from '../../../utils/Validation'
import firebase from '../../../utils/firebase'
import 'firebase/auth'
import './LoginForm.scss'

export default function LoginForm(props) {
  const [formData, setFormData] = useState(defaultValueForm())
  const [showPassword, setShowPassword] = useState(true)
  const { setSelectedForm } = props
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userActive, setUserActive] = useState(true)
  const [user, setUser] = useState(null)

  const handlerShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    setFormError({})
    let errors = {}
    let formOk = true
    if (!validateEmail(formData.email)) {
      errors.email = true
      formOk = false
    }
    if (formData.password.length < 6) {
      errors.password = true
      formOk = false
    }
    setFormError(errors)
    if (formOk) {
      console.log('LogIn sin problemas')
      setIsLoading(true)
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          //Nada
          setUser(response.user)
          setUserActive(response.user.emailVerified)
          if (!response.user.emailVerified) {
            toast.warning('Para poder ingresar debes verificar tu cuenta antes')
          }
        })
        .catch((err) => {
          handleError(err.code)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <div className="login-form">
      <h1>Musica para todos.</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="envelope outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un correo electrónico valido.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'password' : 'text'}
            name="password"
            placeholder="Contraseña"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              La contraseña debe tener al menos 6 caracteres.
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Iniciar Sesión
        </Button>
      </Form>
      {!userActive && (
        <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}

      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿No tienes cuenta?{' '}
          <span onClick={() => setSelectedForm('register')}>Regístrate</span>
        </p>
      </div>
    </div>
  )
}

function ButtonResetSendEmailVerification(props) {
  const { user, setIsLoading, setUserActive } = props
  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success('Se ha enviado el email de verificacion.')
      })
      .catch((err) => {
        handleError(err.code)
      })
      .finally(() => {
        setIsLoading(false)
        setUserActive(true)
      })
  }
  return (
    <div className="resend-verification-email">
      <p>
        Si no has recibido el email de verificacion puedes volver a enviarlo
        haciendo click <span onClick={resendVerificationEmail}>aquí.</span>
      </p>
    </div>
  )
}

function handleError(code) {
  switch (code) {
    case 'auth/wrong-password':
      toast.warning('El usuario o la contraseña son incorrectos.')
      break
    case 'auth/too-many-request':
      toast.warning(
        'Has enviado demasiadas solicitudes de confirmación en poco tiempo',
      )
      break
    case 'auth/user-not-found':
      toast.warning('El usuario o la contraseña son incorrectos.')
      break
    default:
      break
  }
}

function defaultValueForm() {
  return {
    email: '',
    password: '',
  }
}
