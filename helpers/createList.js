import pkg from "whatsapp-web.js";

const { List } = pkg;

const createList = (msg) => {
  const { title, body, answers } = msg;
  const rows = answers;

  const ListAnswers = new List(title, body, [
    {
      subtitle: "Elije una opción",
      rows,
    },
  ]);

  return ListAnswers;
};

export { createList };
