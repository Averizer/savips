import React from "react";
import { Button, Image } from "semantic-ui-react";
import { updatePsico, removePatientList } from "../../utils/Api";
import UserImage from "../../assets/png/user.png";

import "firebase/auth";
import "./FooterName.scss";

export default function FooterName(props) {
  const { userInfo, setReloadApp, user } = props;

  return (
    <div className="container">
      <h4 className="info">
        <p className="psicologo"> {userInfo.nombrepsicologo}</p>{" "}
      </h4>

      <Button
        className="buttonChange"
        onClick={async () => {
          await updatePsico(userInfo.email, userInfo.role);
          await removePatientList(userInfo.emailpsico, userInfo.email);
          window.location.href = "http://localhost:3000/";
        }}
      >
        Cambiar Psicólogo
      </Button>
    </div>
  );
}
