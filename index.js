import pkg from "whatsapp-web.js";
const { Client, LocalAuth, MessageMedia } = pkg;

import qrcode from "qrcode-terminal";
import initializeApi from "./api/index.js";
import beginging from "./bigining.json" assert { type: "json" };
import { operatorActive, stopBot } from "./bot/bot.config.js";
import { validateMessageClient } from "./helpers/validateMessageClient.js";
import { readJson } from "./helpers/readJson.js";
import { createMessage } from "./helpers/createMessage.js";

let isBegining = false;
let currentResponse = beginging.responses;

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

client.on("message_create", (msg) => {
  console.log("CHATS DE LOS OTROS");
  console.log(msg.from);
  console.log(msg.body);

  if (!(msg.body.toLowerCase() === "hola")) return null;

  if (!isBegining) {
    const message = createMessage(beginging);
    sendMessage(msg.from, message);
    isBegining = true;
  } else if (isBegining) {
    let messageClient = msg.body;
    const MINIMUM = 1;
    const MAXIMUM = currentResponse.length;

    if (!validateMessageClient(messageClient, MINIMUM, MAXIMUM)) return null;

    const urlFile = currentResponse[messageClient];
    const json = readJson(urlFile);

    // response = response[messageClient];
    console.log(messageClient);
    console.log(json);
  }
});

client.on("message_ack", (msg, ack) => {
  console.log(`ack: ${ack}`);
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
