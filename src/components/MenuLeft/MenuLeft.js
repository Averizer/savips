import React, { useState, useEffect } from 'react'
import { Menu, Icon, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { verifyTherapistHaving } from '../../utils/Api'
import FooterName from '../FooterName/FooterName'
import logo from '../../assets/png/SAVIPS.png'
import './MenuLeft.scss'

import IngresarPsicologo from '../IngresarPsicologo/IngresarPsicologo'
function MenuLeft(props) {
  const { user, setReloadApp, location } = props
  const [activeMenu, setActiveMenu] = useState(location.pathname)
  const [psychologistAssigned, setPsychologistAssigned] = useState(false)
  //
  useEffect(() => {
    setReloadApp()
    verifyTherapistHaving(user.email).then((response) => {
      response.data().psicologo === ''
        ? setPsychologistAssigned(false)
        : setPsychologistAssigned(true)
    })
  }, [setReloadApp, user])
  
  //Verificar en donde nos encontramos
  useEffect(() => {
    setActiveMenu(location.pathname)
  }, [location])
  
  //Navegar por el menu lateral
  const handlerMenu = (menu) => {
    setActiveMenu(menu.to)
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
          <div className="divider div-transparent"></div>
          
          <Menu.Item
            as={Link}
            to="/terapia"
            name="terapia"
            active={activeMenu === '/terapia'}
            onClick={handlerMenu}
          >
            <Icon name="calendar alternate outline" />
            Terapia
          </Menu.Item>
          <div className="divider div-transparent"></div>

          
        </div>
        <div className="footer">
          {psychologistAssigned ? (
            <FooterName user={user} setReloadApp={setReloadApp} />
          ) : (
            <IngresarPsicologo user={user} setReloadApp={setReloadApp} />
          )}
        </div>
      </Menu>
    </>
  )
}

export default withRouter(MenuLeft)
