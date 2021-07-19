import React, { useState, useEffect } from 'react'
import { Menu, Icon, Image, Form, Input, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { verifyIfTherapist } from '../../utils/Api'
import { validateEmail } from '../../utils/Validation'
import logo from '../../assets/png/SAVIPS.png'

import './MenuLeft.scss'
function MenuLeft(props) {
  let psicologo = 'Pedrito'
  const [formData, setFormData] = useState(defaultValueForm())
  const { user, location } = props
  const [activeMenu, setActiveMenu] = useState(location.pathname)
  const [psychologistAssigned, setPsychologistAssigned] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  //
  useEffect(() => {
    verifyIfTherapist(user.email).then((response) => {
      response.data().psicologo === ''
        ? setPsychologistAssigned(false)
        : setPsychologistAssigned(true)
    })
  }, [user])
  //Verificar en donde nos encontramos
  useEffect(() => {
    setActiveMenu(location.pathname)
  }, [location])
  //Navegar por el menu lateral
  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to)
  }
  //Verificar y guardar cambios del formulario
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  //Verificar que el correo del psicologo sea correcto
  const onSubmit = () => {
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
      setIsLoading(false)
    }
  }
  return (
    <>
      <Menu className="menu-left" borderless vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeMenu === '/'}
            onClick={handlerMenu}
          >
            <Image src={logo} />
          </Menu.Item>
          <div className="divider div-transparent"></div>
          <Menu.Item
            as={Link}
            to="/calendario"
            name="calendario"
            active={activeMenu === '/calendario'}
            onClick={handlerMenu}
          >
            <Icon name="calendar alternate outline" />
            Calendario
          </Menu.Item>
          <div className="divider div-transparent"></div>
          <Menu.Item
            as={Link}
            to="/mensajes"
            name="mensajes"
            active={activeMenu === '/mensajes'}
            onClick={handlerMenu}
          >
            <Icon name="mail" />
            Mensajes
          </Menu.Item>
          <div className="divider div-transparent"></div>
          <Menu.Item
            as={Link}
            to="/historial"
            name="historial"
            active={activeMenu === '/historial'}
            onClick={handlerMenu}
          >
            <Icon name="history" />
            Historial
          </Menu.Item>
        </div>

        {psychologistAssigned ? (
          <div className="footer">
            <h4>Actualmente tu psicologo es {psicologo}</h4>
          </div>
        ) : (
          <div className="footer">
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
          </div>
        )}
      </Menu>
    </>
  )
}

export default withRouter(MenuLeft)

function defaultValueForm() {
  return {
    email: '',
  }
}
