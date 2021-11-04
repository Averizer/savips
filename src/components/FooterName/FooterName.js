import React from "react";
import { Button } from "semantic-ui-react";
import { updatePsico, removePatientList } from "../../utils/Api";

import "firebase/auth";
import "./FooterName.scss";

export default function FooterName(props) {
  const { userInfo, setReloadApp } = props;

  return (
    <div>
      <h4>Actualmente tu psicologo es {userInfo.nombrepsicologo}. </h4>
      <Button
        onClick={async () => {
          await updatePsico(userInfo.email, userInfo.role);
          await removePatientList(userInfo.emailpsico, userInfo.email);
          window.location.reload();
        }}
      >
        Cambiar Psicologo
      </Button>
    </div>
  );
}
