import React, { useState, useEffect } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import FooterName from "../FooterName/FooterName";
import logo from "../../assets/png/SAVIPS.png";
import "./MenuLeft.scss";

import { ReactComponent as SAVIPS } from "./../../assets/svg/savips.svg";

import IngresarPsicologo from "../IngresarPsicologo/IngresarPsicologo";
function MenuLeft(props) {
  const { setReloadApp, location, userInfo, user } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const [rolePacient, setRolePacient] = useState(false);

  //Verificar en donde nos encontramos
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    // console.log(userInfo);
    if (userInfo.role === "paciente" && userInfo.emailpsico == "") {
      setRolePacient(true);
    } else if (userInfo.role === "paciente" && userInfo.emailpsico != "") {
      setRolePacient(false);
    }
  }, [userInfo]);

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
            <SAVIPS />
            {/* <Image src={logo} /> */}
          </Menu.Item>
          <div className="divider div-transparent"></div>

          <Menu.Item
            as={!rolePacient && Link}
            to="/calendario"
            name="calendario"
            active={activeMenu === "/calendario"}
            onClick={handlerMenu}
            disabled={rolePacient}
          >
            <Icon name="calendar alternate outline" />
            Calendario
          </Menu.Item>
          <div className="divider div-transparent"></div>

          <Menu.Item
            as={!rolePacient && Link}
            to="/mensajesConfig"
            name="mensajesConfig"
            active={activeMenu === "/mensajesConfig"}
            onClick={handlerMenu}
            disabled={rolePacient}
          >
            <Icon name="mail" />
            Mensajes
          </Menu.Item>
          <div className="divider div-transparent"></div>
          <Menu.Item
            as={!rolePacient && Link}
            to="/historial"
            name="historial"
            active={activeMenu === "/historial"}
            onClick={handlerMenu}
            disabled={rolePacient}
          >
            <Icon name="history" />
            Historial
          </Menu.Item>
          <Menu.Item
            as={!rolePacient && Link}
            to="/therapyConfig"
            name="therapyConfig"
            active={activeMenu === "/therapyConfig"}
            onClick={handlerMenu}
            disabled={rolePacient}
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
            <FooterName
              userInfo={userInfo}
              setReloadApp={setReloadApp}
              user={user}
            />
          )}
        </div>
      </Menu>
    </>
  );
}

export default withRouter(MenuLeft);
