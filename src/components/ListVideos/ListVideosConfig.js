import React, { useState, useEffect } from "react";
import { List, Button, Form, Input } from "semantic-ui-react";
import alertErrors from "../../utils/AlertError";
import { getVideos, addVideo, deleteVideo } from "../../utils/Api";
import { toast } from "react-toastify";

// import { SocketContext } from "../../utils/ServerIO";

import "./ListVideosConfig.scss";

export default function ListVideosConfig(props) {
  const [videoList, setVideoList] = useState();
  const [video, setVideo] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const { user, setShowModal, setTitleModal, setContentModal, userInfo } =
    props;

  useEffect(async () => {
    await getVideos(userInfo.email).then((res) => {
      setVideo(res);
    });
  }, [updateList]);

  useEffect(() => {
    if (video) {
      setVideoList(
        video.map((video) => (
          <List.Item className="main" key={video.id}>
            <List.Content floated="right">
              <Button
                onClick={async () => {
                  console.log(video.id);
                  setUpdateList((state) => !state);
                  await deleteVideo(userInfo.email, video.id)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                X
              </Button>
            </List.Content>
            <List.Content className="content">
              <List.Header className="head">{video.title}</List.Header>
              <List.Description>{video.description}</List.Description>
            </List.Content>
          </List.Item>
        ))
      );
    }
  }, [video, updateList]);

  const onEdit = () => {
    setTitleModal("Actualizar contraseña");
    setContentModal(
      <AddVideoForm
        setShowModal={setShowModal}
        user={user}
        userInfo={userInfo}
        setUpdateList={setUpdateList}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="videoContent">
      {videoList && (
        <>
          <div className="title">
            <h1 className="titleText">Videos</h1>
            <Button onClick={onEdit}>Agregar Video</Button>
          </div>

          <List
            divided
            verticalAlign="middle"
            style={{ overflow: "auto", maxHeight: 200 }}
            className="list"
          >
            {videoList}
          </List>
        </>
      )}
    </div>
  );
}

function AddVideoForm(props) {
  const [isloading, setIsloading] = useState(false);
  const { userInfo, setShowModal, setUpdateList } = props;

  const [formData, setFormData] = useState({
    videoId: "",
    title: "",
    description: "",
  });

  const onSubmit = async () => {
    console.log(formData);
    setUpdateList((state) => !state);
    if (
      formData.videoId != "" &&
      formData.title != "" &&
      formData.desciption != ""
    ) {
      setIsloading(true);
      await addVideo(userInfo.email, formData)
        .then((res) => {
          setShowModal(false);
          toast.success("Video agregado exitosamente");
        })
        .catch((err) => {
          alertErrors(err?.code);
          setIsloading(false);
          console.log(err);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Ingresa el ID del video"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, videoId: e.target.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Ingresa el título del video"
          type="text"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Ingresa una breve descripción del video"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </Form.Field>
      <Button type="submit" loading={isloading}>
        Agregar
      </Button>
    </Form>
  );
}
