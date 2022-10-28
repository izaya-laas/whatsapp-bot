import { sendMessage } from "../../index.js";

const errorLength = (min, max) => {
  sendMessage(
    phoneClient,
    `Por favor seleccciona una opción entre ${min} y ${max}`
  );
};

export { errorLength };
