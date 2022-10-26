const validateMessageClient = (message, min, max) => {
  message = parseInt(message);
  return typeof message === "number" && message >= min && message <= max;
};

export { validateMessageClient };
