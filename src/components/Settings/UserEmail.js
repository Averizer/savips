import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { reauthenticate } from "../../utils/Api";
import alertErrors from "../../utils/AlertError";
import firebase from "../../utils/firebase";

import { updateEmail } from "../../utils/Api";
import "firebase/auth";

export default function UserEmail(props) {
  const {
    user,
    setShowModal,
    setTitleModal,
    setContentModal,
    setReloadApp,
    userInfo,
  } = props;

  const onEdit = () => {
    setTitleModal("Edita tu correo");
    setContentModal(
      <ChangeEmailForm
        email={user.email}
        setShowModal={setShowModal}
        setReloadApp={setReloadApp}
        userInfo={userInfo}
      />
    );
    setShowModal(true);
    console.log("editando el correo del usuario");
  };

  return (
    <div className="user-email">
      <h4>Email: {user.email}</h4>{" "}
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangeEmailForm(props) {
  const { email, setShowModal, userInfo } = props;
  const [showPasword, setShowPasword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isloading, setIsloading] = useState(false);

  const onSubmit = async () => {
    if (!formData.email) {
      toast.warning("El email es el mismo.");
    } else {
      setIsloading(true);
      reauthenticate(formData.password)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updateEmail(formData.email)
            .then(() => {
              console.log("email actualizado");
              toast.success("Correo actualizado");
              setIsloading(false);
              setShowModal(false);
              currentUser.sendEmailVerification().then(async () => {
                toast("Correo de verificacion reenviado");
                await updateEmail(formData.email, email, userInfo.role);
                firebase.auth().signOut();
              });
            })
            .catch((err) => {
              console.log(err);
              alertErrors(err?.code);
              setIsloading(false);
            });
        })
        .catch((err) => {
          alertErrors(err?.code);
          setIsloading(false);
        });
    }
  };

  const handlerShowPassword = () => {
    setShowPasword(!showPasword);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={email}
          type="text"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Contraseña"
          type={showPasword ? "password" : "text"}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
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
        />
      </Form.Field>
      <Button type="submit" loading={isloading}>
        Actualizar
      </Button>
    </Form>
  );
}
