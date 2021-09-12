import React from "react";
import { Image } from "semantic-ui-react";
import ilustracion from "../../assets/svg/ilustacion-inicio.svg";
import "./Home.scss";

export default function Home(props) {
  const { user } = props;
  return (
    <div className="home">
      <Image src={ilustracion} />
      <div className="textoInicio">
        <h1>¿Hola, {user.displayName} listo para mejorar tu animo?</h1>
      </div>
    </div>
  );
}
