export class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "ClientSideError";
  }
}
