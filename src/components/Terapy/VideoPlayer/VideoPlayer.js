import React, { useContext, useState, useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";

import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from "../../../utils/ServerIO";

import "./VideoPlayer.scss";

const useStyles = makeStyles((theme) => ({
  // video: {
  //   width: "94%",
  //   borderRadius: "18px",
  //   background: "grey",
  // },
  // gridContainer: {
  //   justifyContent: "center",
  //   width: "100%",
  // },
  // paper: {
  //   width: "50%",
  //   padding: "0 10px 0 10px",
  //   // border: "2px solid black",
  // },
}));

const VideoPlayer = (props) => {
  const { setContent, setNotifications, setNotificationsContent } = props;

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const classes = useStyles();

  const [video1, setVideo1] = useState(true);
  const [video2, setVideo2] = useState(true);

  const [userAVideo, setUserAVideo] = useState(null);
  const [myAVideo, setMyAVideo] = useState(null);

  useEffect(() => {
    setUserAVideo(
      <video
        playsInline
        ref={userVideo}
        autoPlay
        className="video"
        onClick={() => {
          setVideo1(!video1);
          console.log("userVideo: ", video1);
        }}
      />
    );
    console.log("userVideo: ", userVideo);
  }, [callAccepted, callEnded, video2, video1]);

  useEffect(() => {
    setMyAVideo(
      <video
        playsInline
        muted
        ref={myVideo}
        autoPlay
        className="hidden"
        onClick={() => {
          setVideo2(!video2);
          console.log("myVideo: ", video2);
        }}
      />
    );
    console.log("myVideo: ", myVideo);
  }, [stream, video1, video2]);

  // setContent(13);
  // setNotifications(0);
  // setNotificationsContent(null);

  return (
    <Grid className="gridVideo">
      <Grid.Row className="topBar">
        <Grid.Column className="c1">
          <h1 className="t1">FO</h1>
        </Grid.Column>
        <Grid.Column className="c2">
          <h1 className="t2">Fernanda Ocampo</h1>
        </Grid.Column>
        {/* <Grid.Column className="c3">
          <h1 className="t3">Finalizar</h1>
        </Grid.Column> */}
      </Grid.Row>

      <Grid.Row className="videoBar">
        {callAccepted && !callEnded && video2 && (
          <Grid.Column className="c2" width={16}>
            {userAVideo}
          </Grid.Column>
        )}
        {stream && video1 && (
          <Grid.Column
            className="c1"
            width={5}
            // verticalAlign="bottom"
            // floated="right"
          >
            {myAVideo}
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

// function VideoInit(myVideo, classes) {
//   // const { myVideo } = useContext(SocketContext);
//   // const classes = useStyles();

//   return (
//     <Grid container className={classes.gridContainer}>
//       {/* Our Video */}
//       <Paper className={classes.paper} elevation={0}>
//         <Grid>
//           {/* <video
//             playsInline
//             muted
//             ref={myVideo}
//             autoPlay
//             className={classes.video}
//           /> */}
//         </Grid>
//       </Paper>
//     </Grid>
//   );
// }

// function VideoDuo(myVideo, userVideo, classes) {
//   // const classes = useStyles();
//   // const { myVideo, userVideo } = useContext(SocketContext);
//   return (
//     <Grid container className={classes.gridContainer}>
//       {/* {stream && <Box sx={{ display: "flex" }}></Box>} */}
//       {/* Our Video */}
//       <Paper className={classes.paper} elevation={0}>
//         <Grid>
//           {/* <video
//             playsInline
//             muted={true}
//             ref={myVideo}
//             autoPlay
//             className={classes.video}
//           /> */}
//         </Grid>

//         {/* Users Video */}
//         <Paper className={classes.paperx} elevation={0}>
//           <Grid>
//             {/* <video
//               playsInline
//               muted={false}
//               ref={userVideo}
//               autoPlay={true}
//               className={classes.video}
//             /> */}
//           </Grid>
//         </Paper>
//       </Paper>
//     </Grid>

// <Grid container className={classes.gridContainer}>
//   {/* Our Video */}
//   <Paper className={classes.paper} elevation={0}>
//     <Grid>
//       <video
//         playsInline
//         muted
//         ref={myVideo}
//         autoPlay
//         className={classes.video}
//       />
//     </Grid>
//   </Paper>

//   {/* Users Video */}
//   <Paper className={classes.paperx} elevation={0} hidden={false}>
//     <Grid>
//       <video
//         playsInline
//         ref={userVideo}
//         autoPlay
//         className={classes.video}
//       />
//     </Grid>
//   </Paper>
// </Grid>
//   );
// }

export default VideoPlayer;
