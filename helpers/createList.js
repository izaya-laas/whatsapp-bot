import pkg from "whatsapp-web.js";

const { List } = pkg;

const createList = (msg) => {
  console.log("Creando Lista");

  const { title, body, answers } = JSON.parse(msg);
  const ListAnswers = new List(title, body, answers);
  console.log(ListAnswers);

  return ListAnswers;
};

export { createList };
