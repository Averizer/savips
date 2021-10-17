import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import { updateUserName } from "../../../src/utils/Api";

import "firebase/auth";

export default function UserName(props) {
  const {
    user,
    setContentModal,
    setTitleModal,
    setShowModal,
    setReloadApp,
    userInfo,
  } = props;
  const onEdit = () => {
    setTitleModal("Edita tu nombre");
    setContentModal(
      <ChangeDisplayNameForm
        user={user}
        displayName={user.displayName}
        setShowModal={setShowModal}
        setReloadApp={setReloadApp}
        userInfo={userInfo}
      />
    );
    setShowModal(true);
    console.log("editando el nombre del usuario");
  };
  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, setReloadApp, user, userInfo } = props;
  const [formData, setFormData] = useState({ displayName: displayName });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    if (!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
    } else {
      // console.log(firebase.auth().currentUser);
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: formData.displayName })
        .then(async () => {
          setReloadApp((prevState) => !prevState);
          toast.success("Nombre actualizado correctamente");
          await updateUserName(formData.displayName, user.email, userInfo.role);
          setIsLoading(false);
          setShowModal(false);
        })
        .catch(() => {
          toast.error("Error al actualizar el nombre, intenta más tarde!");
          setIsLoading(false);
        });
      console.log(userInfo);
    }
    //setShowModal(false)
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => setFormData({ displayName: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar nombre
      </Button>
    </Form>
  );
}
