import { Service } from 'typedi';
import { Repository } from "typeorm";
import { plainToClass } from 'class-transformer';

import { User } from 'data/db/entity';
import { NotFoundError, CryptoService, AuthenticationError } from 'common';
import { UserAuthenticationRequest } from 'request';
import { UserDataSource } from 'data/db';

@Service()
export class UserAuthenticationUseCase {
  constructor(
    private userDataSource: UserDataSource,
    private cryptoService: CryptoService
  ) {}

  async authenticate(userAuthenticationRequest: UserAuthenticationRequest): Promise<any> {

    let user = null;

    if (userAuthenticationRequest.email) {
      user = await this.userDataSource.getUserByEmailAndPassword(
          userAuthenticationRequest.email,
          this.cryptoService.generateHash(userAuthenticationRequest.password));
    }
    else {
      user = await this.userDataSource.getUserByUsernameAndPassword(
          userAuthenticationRequest.username,
          this.cryptoService.generateHash(userAuthenticationRequest.password));
    }

    if(!user) {
      throw new AuthenticationError('Invalid credentials');
    }
    return user;
  }
}
