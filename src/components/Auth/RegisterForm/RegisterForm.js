import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import firebase from '../../../utils/firebase'
import { registrarUsuario } from '../../../utils/Api'
import 'firebase/auth'
import 'firebase/firestore'
import { validateEmail } from '../../../utils/Validation'
import './RegisterForm.scss'

export default function RegisterForm(props) {
  const [formData, setFormData] = useState(defaultValueForm())
  const [showPasword, setShowPasword] = useState(true)
  const { setSelectedForm } = props
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handlerShowPassword = () => {
    setShowPasword(!showPasword)
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
    if (!formData.nombre) {
      errors.name = true
      formOk = false
    }
    setFormError(errors)

    if (formOk) {
      setIsLoading(true)
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(formData.email, formData.password)
          .then(() => {
            changeUserName()
            sendVerificationEmail()
            toast.success('Registro exitoso')
          })
          .catch((e) => {
            toast.error('Error al crear la cuenta.')
            console.log(e)
          })
          .finally(() => {
            setIsLoading(false)
          })
        registrarUsuario(formData.email, formData)
        setSelectedForm(null)
      } catch (e) {
        console.log(e)
        toast.error('Hubo un error intenta más tarde')
        setSelectedForm(null)
      }
    }
  }

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast('Se ha enviado el email de verificación.')
      })
      .catch(() => {
        toast.error('Error al enviar email de verificación.')
      })
  }

  const changeUserName = () => {
    firebase
      .auth()
      .currentUser.updateProfile({ displayName: formData.nombre })
      .catch(() => {
        toast.error('Error al asignar el nombre.')
      })
  }

  return (
    <div className="register-form">
      <h1>¡Muy bien, diste un paso en la dirección correcta!</h1>
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
            type={showPasword ? 'password' : 'text'}
            name="password"
            placeholder="Contraseña"
            icon={
              showPasword ? (
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
        <Form.Field>
          <Input
            type="text"
            name="nombre"
            placeholder="¿Como deberíamos llamarte?"
            icon="user circle outline"
            error={formError.name}
          />
          {formError.name && (
            <span className="error-text">Por favor introduce tu nombre.</span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Continuar
        </Button>
      </Form>
      <div className="divider div-transparent div-dot"></div>

      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes cuenta?{' '}
          <span onClick={() => setSelectedForm('login')}> Iniciar sesión</span>
        </p>
      </div>
    </div>
  )
}

function defaultValueForm() {
  return {
    nombre: '',
    email: '',
    password: '',
  }
}
