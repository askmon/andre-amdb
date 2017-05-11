import { Body, Post, JsonController, UseBefore } from 'routing-controllers';
import { Service, Inject, Container } from 'typedi';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { Validator } from 'class-validator';

import { UserCreateUseCase, UserAuthenticationUseCase } from 'use-case';
import { UserRequest, UserAuthenticationRequest } from 'request';
import { RequestValidationError, JwtService } from 'common';

@Service()
@JsonController()
export class UserController {

  constructor(
    private userCreateUseCase: UserCreateUseCase,
    private userAuthenticationUseCase: UserAuthenticationUseCase,
    private jwtService: JwtService,
    private validator: Validator
  ) {}

  @Post('/user/create')
  async create(@Body() user: UserRequest) {
    let errors = await this.validator.validate(user);
    if (errors.length) {
      throw new RequestValidationError(errors);
    }
    else {
      return this.userCreateUseCase.create(user);
    }
  }

  @Post('/user/authenticate')
  async authenticate(@Body() userAuthentication: UserAuthenticationRequest) {
    let errors = await this.validator.validate(userAuthentication, { skipMissingProperties: true });
    if (errors.length) {
      throw new RequestValidationError(errors);
    }
    else {
      const user = await this.userAuthenticationUseCase.authenticate(userAuthentication);

      const jwtToken = this.jwtService.sign({ username: user.username });

      return {
        token: jwtToken
      };
    }
  }

}
