import { Repository } from 'typeorm';
import { Service } from 'typedi';

import { User } from 'data/db/entity';

@Service()
export class UserDataSourceMock {

  async create(user: User): Promise<User> {
    return new User();
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
    let user = new User();
    user.email = email;
    user.id = 1;
    user.password = password;
    return user;
  }

  async getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let user = new User();
    user.username = username;
    user.id = 1;
    user.password = password;
    return user;
  }

}
