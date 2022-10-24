import express from "express";
import cors from "cors";
import { sendMessage } from "../index.js";

const app = express();

const sendWithApi = (req, res) => {
  const { message = "xd", to = "5492302210818" } = req.body;
  const number = `${to}@c.us`;

  sendMessage(number, message);
  res.send({ status: "enviado", msg: message });
};

const initializeApi = () => {
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.post("/send", sendWithApi);

  app.listen(9000, () => {
    console.log("api esta arriba");
  });
};

export default initializeApi;
