import { MongoClient } from "mongodb";

export default async function dbConnection() {
  try {
    const client = new MongoClient(
      "mongodb+srv://LFFloresC:Lui$fer1@cluster0.hsnra.mongodb.net/flowData?retryWrites=true&w=majority"
    );
    // console.log("LAAA; ", process.env.MONGODB_CNN);
    console.log("Base de datos online");
    return client;
  } catch (e) {
    // console.log("LAAA; ", process.env.REACT_APP_TEST);
    console.log(e);
    // throw new Error("Error a la hora de iniciar la base de datos");
  }
}
