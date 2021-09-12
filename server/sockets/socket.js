const { io } = require("../server");
const { dbConnection } = require("../../database/config");
const express = require("express")();
// const DataMind = require("../../models/dataMind");

var collection;

const bdConnection = async () => {
  const client = await dbConnection();
  try {
    await client.connect();
    collection = client.db("flowMind").collection("data");
    // console.log("BD creada");
  } catch (error) {
    console.error(error);
  }
};

bdConnection();

io.on("connection", (socket) => {
  socket.on("client", async (dataClientId) => {
    try {
      let result = await collection.findOne({ _id: dataClientId });
      if (!result) {
        await collection.insertOne({ _id: dataClientId, data: [] });
      }
      console.log(dataClientId);
      socket.join(dataClientId);
      socket.emit("clientData", dataClientId);
      socket.activeRoom = dataClientId;
    } catch (error) {}
  });

  socket.on("data", (data) => {
    console.log(data);
    collection.updateOne(
      {
        _id: socket.activeRoom,
      },
      {
        $push: {
          data: data,
        },
      }
    );
    io.to(socket.activeRoom).emit("dataResult", data);
    // socket.broadcast.emit("dataResult", data);
  });

  // socket.on("mindBroadcast", (array) => {
  //   const data = new DataMind(array);
  //   data.save().then(() => {
  //     io.emit("result", array);
  //   });
  //   console.log(array);
  // });
});

// express.get("/clientData", async (req, res) => {
//   try {
//     let result = await collection.findOne({ _id: req.query.data });
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ message: e.message });
//   }
// });
