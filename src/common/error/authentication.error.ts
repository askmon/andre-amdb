export class AuthenticationError extends Error {

  constructor(message?: string) {
    super(message);

    this.name = 'AuthenticationError';
    this.stack = (<any> new Error()).stack;
  }

}
