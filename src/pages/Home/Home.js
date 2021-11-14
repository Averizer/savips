import React from "react";
import { Image } from "semantic-ui-react";
import ilustracion from "../../assets/svg/ilustacion-inicio.svg";
import feliz from "./../../assets/svg/feliz.svg";

import "./Home.scss";

export default function Home(props) {
  const { user } = props;
  return (
    <div className="home">
      {/* <Image src={ilustracion} />
      <div className="textoInicio">
        <h1>¿Hola, {user.displayName} listo para mejorar tu animo?</h1>
      </div> */}
      <div className="latestUpdateP">
        <div className="imageFloatP">
          <Image className="imageLatestP" src={ilustracion} />
        </div>
        <div className="containerP">
          <h1 className="titleLatestP">
            Es bueno tenerte de vuelta{" "}
            <p className="user">{user.displayName} !</p>
          </h1>
        </div>
        <div className="initSessionContainer">
          <p className="text">
            Navega a través del menú lateral para poder conocer cada una de
            nuestras funciones.
          </p>
          <p className="text1">¡Te esperan cosas increíbles!</p>
        </div>
        <div className="img">
          <Image className="imageLatestP" src={feliz} />
        </div>

        {/* <FELIZ /> */}
        {/* </div> */}
      </div>
    </div>
  );
}
