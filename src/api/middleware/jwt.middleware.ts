import {MiddlewareInterface, Middleware} from "routing-controllers";
import { Service } from 'typedi';

import { JwtService } from 'common';
import { AuthenticationError } from 'common';

@Service()
@Middleware()
export class JwtMiddleware implements MiddlewareInterface {

  constructor(private jwt: JwtService) {}

  use(request: any, response: any, next?: Function): any {
    let token = request.headers['authorization'];
    token = this.jwt.verify(token);

    if (!token) {
      next(new AuthenticationError('invalid authorization header'));
      return;
    }
    next();
  }
}