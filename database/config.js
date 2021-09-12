// const mongoose = require("mongoose");

const { MongoClient } = require("mongodb");

const dbConnection = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_CNN);

    // await mongoose.connect(process.env.MONGODB_CNN, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("Base de datos online");

    return client;
  } catch (e) {
    console.log(e);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
