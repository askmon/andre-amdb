
import { createConnection, ConnectionOptions } from 'typeorm';
import { Service } from 'typedi';
import * as path from 'path';
declare var __dirname;

export class DbConnection{

  public static getConnectionOptions(url: string, autoSchemaSync: boolean = false): ConnectionOptions {

    const connectionOptions: ConnectionOptions = {
		    driver: {
	        type: 'mysql',
          url: url
		    },
        entities: [
          path.join(__dirname, '..') + '/entity/index.{ts,js}'
        ],
        migrations: [
          path.join(__dirname, '.') + '/migration/*.{ts,js}'
        ],
        autoSchemaSync: autoSchemaSync
    };
    return connectionOptions;
  }
}
