class ClientError extends Error {
  constructor(message) {
    super(message);

    this.name = ClientError.name;
  }
}

module.exports = ClientError;
