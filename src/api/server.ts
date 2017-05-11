declare var __dirname;
import * as path from 'path';

import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as memjs from 'memjs';

import { useExpressServer, createExpressServer, useContainer } from 'routing-controllers';
import { createConnection, useContainer as useTypeContainer, Connection } from 'typeorm';
import { useContainer as useClassValidatorContainer, Validator } from 'class-validator';

import { Container } from 'typedi';
import { DbConnection } from 'data/db/setup/db.connection';
import { MEMJS_CONNECTION } from 'data/memcache'
import { CRYPTO_SALT, JWT_SECRET } from 'common';

declare var process;

export default class Server {

  public async configure(): Promise<any> {
    await this.configureDB();
    await this.configureMemcache();
    this.configureServices();
  }

  public run(param: string): Promise<any> {
    let app = express();
    app.use(cors());
    app.use(compression());
    app.disable('x-powered-by');

    let port = process.env.PORT || 3000;

    useExpressServer(app, {
      defaultErrorHandler: false,
      controllers        : [path.join(__dirname, '..') + "/**/*.controller.{ts,js}"],
      middlewares        : [path.join(__dirname, '..') + "/**/*.middleware.{ts,js}"],
    }).listen(port);
    console.info(`Listening to port ${port}`);
    return app;
  }

  private async configureDB(): Promise<void> {
    console.log('Will connect to DB');
    await createConnection(DbConnection.getConnectionOptions(process.env.DATABASE_URL));
    console.info('Connected to database!');
  }

  private configureMemcache() {
    const memjsClient = memjs.Client.create(process.env.MEMCACHE_SERVERS);
    Container.set(MEMJS_CONNECTION, memjsClient);
  }

  private configureServices() {
    Container.set(CRYPTO_SALT, process.env.CRYPTO_SALT);
    Container.set(JWT_SECRET, process.env.JWT_SECRET);
  }

}
