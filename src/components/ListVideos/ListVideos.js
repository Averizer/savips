import React, { useContext, useState, useEffect } from "react";
import { List, Image } from "semantic-ui-react";
import { SocketContext } from "../../utils/ServerIO";
import { getVideos } from "../../utils/Api";

export default function ListVideos(props) {
  const { userInfo } = props;
  const { setVideId } = useContext(SocketContext);
  const [videoList, setVideoList] = useState();
  const [video, setVideo] = useState([]);

  useEffect(async () => {
    await getVideos(userInfo.email).then((res) => {
      setVideo(res);
    });
  }, []);

  useEffect(() => {
    if (video) {
      setVideoList(
        video.map((video) => (
          <List.Item
            className="main"
            onClick={() => {
              setVideId(video.id);
            }}
          >
            <List.Content className="content">
              <List.Header className="head">{video.title}</List.Header>
              <List.Description>{video.description}</List.Description>
            </List.Content>
          </List.Item>
        ))
      );
    }
  }, [video]);
  return (
    <>
      {videoList && (
        <div>
          <h1 className="title">Videos</h1>
          <List
            divided
            verticalAlign="middle"
            style={{ overflow: "auto", maxHeight: 200 }}
            className="list"
          >
            {videoList}
          </List>
        </div>
      )}
    </>
  );
}
