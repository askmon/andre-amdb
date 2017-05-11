import { createConnection, Connection } from 'typeorm';

import { DbConnection } from 'data/db/setup/db.connection';
import { Migrate } from 'data/db/setup/migrate';

import { Container } from 'typedi';

declare var process;

export default class WorkerMigration {

  constructor() { }

  public async configure(): Promise<any> {
    this.configureConstants();
    await this.configureDB();
  }

  private configureConstants() {
  }

  private async configureDB(): Promise<any> {
    Container.set(Connection, await createConnection(DbConnection.getConnectionOptions(process.env.DATABASE_URL)));
    console.info('Connected to database');
    return;
  }

  public async run(param: string): Promise<any> {
    let migrate = Container.get(Migrate);
    await migrate.run(true);
    console.info('Migration finished');
    process.exit(0);
  }
}