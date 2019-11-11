class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class NoAuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class NoResursError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  NoAuthorizationError,
  NoResursError,
  ServerError,
};