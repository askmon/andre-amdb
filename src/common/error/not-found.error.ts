export class NotFoundError extends Error {

  constructor(message?: string) {
    super(message);

    this.name = 'NotFoundError';
    this.stack = (<any> new Error()).stack;
  }

}
