export class DataValidationError extends Error {

  constructor(message?: string) {
    super(message);

    this.name = 'DataValidationError';
    this.stack = (<any> new Error()).stack;
  }

}
