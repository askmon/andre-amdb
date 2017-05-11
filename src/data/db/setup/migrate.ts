import { Connection, Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Validator } from 'class-validator';

@Service()
export class Migrate {

  constructor(private connection: Connection) {}

  public async run(recreate: boolean): Promise<void> {

    console.info(`Syncing schemas and running ${recreate ? 'all': 'pending'} migrations`);
    await this.connection.syncSchema(recreate);
    await this.connection.runMigrations();

    return;
  }

}
