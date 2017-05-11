import { ErrorMiddlewareInterface, MiddlewareGlobalAfter } from "routing-controllers";
import { Service, Container } from 'typedi';
import { RequestValidationError } from './'


@Service()
@MiddlewareGlobalAfter()
export class GlobalErrorMiddleware implements ErrorMiddlewareInterface {

  error(error: any, request: any, response: any, next?: Function): void {

    //console.error(error);

    if(!error) {
      next()
      return;
    }

    switch(error.name) {
      case 'CustomError':
        response.status(error.code).send({errors: [{
          name:           error.name,
          message:        error.message
        }]});
        break;

      case 'AuthenticationError':
        response.status(401).send({errors: [{
          name:           error.name,
          message:        error.message
        }]});
        break;

      case 'NotFoundError':
        response.status(404).send({errors: [{
          name:           error.name,
          message:        error.message
        }]});
        break;

      case 'RequestValidationError':
        response.status(400).send({errors: error.parse()});
        break;

      default:
        response.status(500).send({errors: [{
          name:           error.name,
          message:        error.message
        }]});
        break;
    }

    next();
  }
}
