const validateMessageClient = (message, min, max) => {
  message = parseInt(message);
  return typeof message === "number" && message >= min && message <= max;
};

export { validateMessageClient };

console.log(validateMessageClient("5", 1, 4));
