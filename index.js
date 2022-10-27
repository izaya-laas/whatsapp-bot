import pkg from "whatsapp-web.js";
const { Client, LocalAuth, MessageMedia } = pkg;

import qrcode from "qrcode-terminal";
import initializeApi from "./api/index.js";
import beginging from "./bigining.json" assert { type: "json" };
import { validateMessageClient } from "./helpers/validateMessageClient.js";
import { readJson } from "./helpers/readJson.js";
import { createMessage } from "./helpers/createMessage.js";
import { operatorActive, stopBot } from "./bot/bot.config.js";
import { createList } from "./helpers/createList.js";

let isBegining = false;
let currentBotResponses = beginging.responses;
let botMessage = "";

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

client.on("message_create", async (msg) => {
  console.log("CHATS DE LOS OTROS");
  const messageClient = msg.body;
  const phoneClient = msg.from;
  if (phoneClient !== "5492302210818@c.us") return null;

  const MINIMUM = 1;
  const MAXIMUM = currentBotResponses.length;
  botMessage = createMessage(beginging);
  if (!isBegining) {
    console.log("Recien comienza");
    sendMessage(phoneClient, botMessage);
    isBegining = true;
  } else {
    console.log("Ya empezo la papa");
    if (!validateMessageClient(messageClient, MINIMUM, MAXIMUM)) {
      sendMessage(
        phoneClient,
        `Por favor seleccciona una opción entre ${MINIMUM} y ${MAXIMUM}`
      );
    }
    const ResponseFile = currentBotResponses[messageClient];
    currentBotResponses = await readJson(ResponseFile);
    console.log(ResponseFile);
    console.log(currentBotResponses);
    botMessage = createMessage(currentBotResponses);
  }
});

client.on("message_ack", (msg, ack) => {
  console.log(`ack: ${ack}`);
});

const sendMessage = (to, message) => {
  console.log("naaaaa");

  client.sendMessage(to, message);
};

const sendMedia = (to, file) => {
  const mediaFile = MessageMedia.fromFilePath(`/media-send/${file}`);
  client.sendMessage(to, mediaFile);
};

process.on("uncaughtException", (err, origin) => {
  console.log(err.message);
  console.log(origin);
});

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
