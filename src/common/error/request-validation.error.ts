import { ValidationError } from 'class-validator';

export class RequestValidationError extends Error {

  constructor(message?: string);
  constructor(validation: ValidationError[]);

  constructor(messageOrValidation: any) {
    if (messageOrValidation instanceof Array) {
      super(JSON.stringify(messageOrValidation));
    } else {
      super(messageOrValidation);
    }

    this.name = "RequestValidationError";
    this.stack = (<any> new Error()).stack;
  }

  parse(): string[] {
    let parsedErrors: any[] = [];

    try {
      let errors = JSON.parse(this.message);

      errors.map(error =>{
        Object.keys(error.constraints).map(key => {
          parsedErrors.push({name: this.name, message: error.constraints[key]});
        });
      });

    } catch (err) {
      parsedErrors.push({name: this.name, message: this.message});
    }

    return parsedErrors;
  }
}
