import { Service } from 'typedi';
import { Repository } from "typeorm";

import { User } from 'data/db/entity';
import { NotFoundError, CryptoService } from 'common';
import { UserRequest } from 'request';
import { UserDataSource } from 'data/db';

@Service()
export class UserCreateUseCase {
  constructor(
    private userDataSource: UserDataSource,
    private cryptoService: CryptoService
  ) {}

  async create(userRequest: UserRequest): Promise<any> {

    let user = new User();
    user.email = userRequest.email;
    user.username = userRequest.username;
    user.password = this.cryptoService.generateHash(userRequest.password);

    user = await this.userDataSource.create(user);

    return {};
  }
}
