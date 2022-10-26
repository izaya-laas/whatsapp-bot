const createMessage = (message) => {
  const { title, body, answers } = message;

  let options = "";

  answers.map((answer, index) => {
    let number = index + 1;
    options += `${number}. ${answer.title}\n`;
  });

  const messageBot = `${title}\n${body}\n\n${options}`;

  return messageBot;
};

export { createMessage };
