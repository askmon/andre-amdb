import { Container } from 'typedi';
import { MovieDataSource, UserDataSource } from 'data/db';
import { MovieDataSourceMock, UserDataSourceMock } from './mock'
import { MovieController, UserController } from 'api'
import { UserTest } from './user.test'
import { MovieTest } from './movie.test'

export default class Test {

  constructor() { }

  public async configure(): Promise<any> {
    Container.set(MovieDataSource, new MovieDataSourceMock());
    Container.set(UserDataSource, new UserDataSourceMock());
  }

  public run(app: any): Promise<any> {
    Container.get(UserTest).register(app);
    Container.get(MovieTest).register(app);
    run();
    return;
  }
}
