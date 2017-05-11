import { Repository } from 'typeorm';
import { OrmRepository } from "typeorm-typedi-extensions";
import { Service } from 'typedi';

import { User } from 'data/db/entity';
import { NotFoundError, CustomError } from 'common';

@Service()
export class UserDataSource {

  constructor(@OrmRepository(User) private repository: Repository<User>) {}

  async create(user: User): Promise<User> {
    try {
      return await this.repository.persist(user);
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      return await this.repository.findOne({email: email, password: password})
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    try {
      return await this.repository.findOne({username: username, password: password})
    } catch (error) {
      throw error;
    }
  }

}
