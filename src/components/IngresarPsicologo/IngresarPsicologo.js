import React, { useState } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { validateEmail } from '../../utils/Validation'
import { therapistExistace, updateTherapistOfPatient } from '../../utils/Api'
import { toast } from 'react-toastify'

export default function IngresarPsicologo(props) {
  console.log(props)
  const { user, setReloadApp } = props
  const [formData, setFormData] = useState(defaultValueForm())
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  //Verificar y guardar cambios del formulario
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  //Verificar que el correo del psicologo sea correcto
  const onSubmit = async () => {
    setFormError({})
    let errors = {}
    let formOk = true

    if (!validateEmail(formData.email)) {
      errors.email = true
      formOk = false
    }
    setFormError(errors)
    //Falta crear la opcion de hacer el update
    if (formOk) {
      setIsLoading(true)
      therapistExistace(formData.email)
        .then(async (response) => {
          console.log(response.data())
          await updateTherapistOfPatient(
            formData.email,
            user.email,
            response.data().nombre,
          )
          setReloadApp((prevState) => !prevState)
          setIsLoading(false)
          toast('Agregado correctamente, por favor recarga  (CTRL + R)')
        })
        .catch((e) => {
          console.log(e)
          toast.error('Hubo un error intenta más tarde')
        })
    }
    setReloadApp((prevState) => !prevState)
  }
  return (
    <>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Ingresa el correo de tu psicologo"
            icon="envelope outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un correo valido.
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Unirte
        </Button>
      </Form>
    </>
  )
}

function defaultValueForm() {
  return {
    email: '',
  }
}
