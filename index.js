import pkg from "whatsapp-web.js";
const { Client, LocalAuth, MessageMedia } = pkg;

import qrcode from "qrcode-terminal";
import initializeApi from "./api/index.js";
import { operatorActive, stopBot } from "./bot/bot.config.js";
import beginging from "./bigining.json" assert { type: "json" };
import fs from "fs";

// const begingingText = JSON.stringify(beginging);
let isBegining = false;
let response;

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("el cliente esta listo");
});

client.on("auth_failure", () => {
  console.log(
    "Error de autentificación, Reinicia el programa y vuelve a escanear el codigo. (reinicio = npm start)"
  );
});

client.on("message", (msg) => {
  console.log("CHATS DE LOS OTROS");
  console.log(msg.from);
  console.log(msg.body);

  const { title, body, answers, responses } = beginging[0];

  if (msg.body.toLowerCase() === "hola") {
    sendMessage(msg.from, "Hola");
    if (!isBegining) {
      const message = `*${title}* \n ${body} \n ${answers}`;
      sendMessage(msg.from, message);
      isBegining = true;
    } else if (isBegining) {
      let res = msg.body;
      console.log(responses[res]);
    }
  }
});

client.on("message_ack", (msg) => {
  if (!msg.fromMe) return;
  console.log("CHATS MIOS");
  console.log(msg.body);
});

const sendMessage = (to, message) => {
  client.sendMessage(to, message);
};

const sendMedia = (to, file) => {
  const mediaFile = MessageMedia.fromFilePath(`/media-send/${file}`);
  client.sendMessage(to, mediaFile);
};

client.initialize();
initializeApi();

export { sendMessage };

//Datos a guardar de usuario: getContact().then.number = (numero) |  _data > notifyName (nombre) || DeviceType (Tipo-celular) ||

/**
 * 1. Array con flujo conversacional donde en msg se lleve el index del array recocorrido y al final de cada elemento reccorrido se sume 1 en el indice,
 * con la posibilidad en una opcion de cancelar el pedido. y que el ultimo elemento reccorrido resetee el flujo 0 en caso de no querer seguir ordenando y en caso de que si
 * que el flujo vuelva a el momento de orden, donde mediante un array de currentOrden se valla pusheando todo lo ordenado. y ese push ordenado pasado una hora no se podra
 * ordenar dentro del mismo paquete dando la entrada a que si se olvido algo pueda agregarlo sin tener que pasar por medio de una consulta humana.
 *
 *
 */
