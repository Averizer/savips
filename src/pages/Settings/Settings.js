import React, { useState } from "react";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import "./Settings.scss";
import UserName from "../../components/Settings/UserName";
import BasicModal from "../../components/Modal/BasicModal";
import UserEmail from "../../components/Settings/UserEmail";
import UserPassword from "../../components/Settings/UserPassword";

export default function Settings(props) {
  const { user, setReloadApp, userInfo } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName
          user={user}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadApp={setReloadApp}
          userInfo={userInfo}
        />
      </div>
      <UserEmail
        user={user}
        userInfo={userInfo}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
        setReloadApp={setReloadApp}
      />
      <UserPassword
        userInfo={userInfo}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
        setReloadApp={setReloadApp}
        user={user}
      />
      <BasicModal show={showModal} 
      setShow={setShowModal} 
      title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
}
