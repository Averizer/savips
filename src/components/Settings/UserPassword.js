import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate, updatePass } from "../../utils/Api";
import alertErrors from "../../utils/AlertError";
import firebase from "../../utils/firebase";
import "firebase/auth";

export default function UserPassword(props) {
  const { setShowModal, setTitleModal, setContentModal, user, userInfo } =
    props;
  const onEdit = () => {
    setTitleModal("Actualizar contraseña");
    setContentModal(
      <ChangePasswordForm
        setShowModal={setShowModal}
        user={user}
        userInfo={userInfo}
      />
    );
    setShowModal(true);
  };
  return (
    <div className="user-email">
      <h4>Contraseña: *** *** *** *** </h4>{" "}
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangePasswordForm(props) {
  const { setShowModal, userInfo, user } = props;
  const [showPasword, setShowPasword] = useState(false);
  const [showPasword2, setShowPasword2] = useState(false);
  const [showPasword3, setShowPasword3] = useState(false);
  const [formData, setFormData] = useState({
    passwordActual: "",
    passwordNueva: "",
    passwordNuevaRepetida: "",
  });
  const [isloading, setIsloading] = useState(false);

  const onSubmit = async () => {
    if (
      !formData.passwordActual ||
      !formData.passwordNueva ||
      !formData.passwordNuevaRepetida
    ) {
      toast.warning("Las contraseñas no pueden estar vacias.");
    } else if (formData.passwordActual === formData.passwordNueva) {
      toast.warning(
        "La contraseña nueva no puede ser igual que la contraseña actual"
      );
    } else if (formData.passwordNueva !== formData.passwordNuevaRepetida) {
      toast.warning("Las nuevas contraseñas no coinciden.");
    } else if (formData.passwordNueva.length < 6) {
      toast.warning("La contraseña debe ser al menos de 6 caracteres.");
    } else {
      setIsloading(true);
      reauthenticate(formData.passwordActual)
        .then(() => {
          console.log("Reautenticado correcto");
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.passwordNueva)
            .then(async () => {
              toast.success("Contraseña actualizada");
              setIsloading(false);
              setShowModal(false);
              await updatePass(
                formData.passwordNueva,
                user.email,
                userInfo.role
              );
              firebase.auth().signOut();
            })
            .catch((err) => {
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
  const handlerShowPassword2 = () => {
    setShowPasword2(!showPasword2);
  };
  const handlerShowPassword3 = () => {
    setShowPasword3(!showPasword3);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Contraseña actual"
          type={showPasword ? "password" : "text"}
          onChange={(e) =>
            setFormData({ ...formData, passwordActual: e.target.value })
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
      <Form.Field>
        <Input
          placeholder="Contraseña nueva"
          type={showPasword2 ? "password" : "text"}
          onChange={(e) =>
            setFormData({ ...formData, passwordNueva: e.target.value })
          }
          icon={
            showPasword ? (
              <Icon
                name="eye slash outline"
                link
                onClick={handlerShowPassword2}
              />
            ) : (
              <Icon name="eye" link onClick={handlerShowPassword2} />
            )
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Repite tu nueva contraseña"
          type={showPasword2 ? "password" : "text"}
          onChange={(e) =>
            setFormData({ ...formData, passwordNuevaRepetida: e.target.value })
          }
          icon={
            showPasword ? (
              <Icon
                name="eye slash outline"
                link
                onClick={handlerShowPassword3}
              />
            ) : (
              <Icon name="eye" link onClick={handlerShowPassword3} />
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
