import React, { useState, useEffect } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { verifyPsico, verifyPacient } from "../../utils/Api";
import FooterName from "../FooterName/FooterName";
import logo from "../../assets/png/SAVIPS.png";
import "./MenuLeft.scss";

import IngresarPsicologo from "../IngresarPsicologo/IngresarPsicologo";
function MenuLeft(props) {
  const { setReloadApp, location, userInfo } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  //Verificar en donde nos encontramos
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);
  //Navegar por el menu lateral
  const handlerMenu = (menu) => {
    setActiveMenu(menu.to);
  };

  return (
    <>
      <Menu className="menu-left" borderless vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeMenu === "/"}
            onClick={handlerMenu}
          >
            <Image src={logo} />
          </Menu.Item>  
          <div className="divider div-transparent"></div>
          
          <Menu.Item
            as={Link}
            to="/calendario"
            name="calendario"
            active={activeMenu === "/calendario"}
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
            active={activeMenu === "/mensajes"}
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
            active={activeMenu === "/historial"}
            onClick={handlerMenu}
          >
            <Icon name="history" />
            Historial
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/therapy"
            name="therapy"
            active={activeMenu === "/therapy"}
            onClick={handlerMenu}
          >
            <Icon name="video" />
            Terapia
          </Menu.Item>
        </div>
        <div className="footer">
          {userInfo.role == "psicologo" ? (
            <div></div>
          ) : userInfo.nombrepsicologo === "" ? (
            <IngresarPsicologo
              userInfo={userInfo}
              setReloadApp={setReloadApp}
            />
          ) : (
            <FooterName userInfo={userInfo} setReloadApp={setReloadApp} />
          )}
        </div>
      </Menu>
    </>
  );
}

export default withRouter(MenuLeft);
