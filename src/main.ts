import 'reflect-metadata';
declare var __dirname;
declare var process;

import * as dotenv from 'dotenv';
dotenv.config();

import { useContainer } from 'routing-controllers';
import { useContainer as useTypeContainer } from 'typeorm';
import { useContainer as useClassValidatorContainer } from 'class-validator';
import { Container } from 'typedi';

useClassValidatorContainer(Container);
useTypeContainer(Container);
useContainer(Container);

export async function exec(runPath: string, param: string): Promise<any> {
  try {
    let Runner = require(runPath).default;
    let runner = new Runner();
    await runner.configure();
    let job = await runner.run(param);
    console.info(`Loaded and running '${runPath}'...`);
    return job;
  } catch (err){
    console.error(`Error running '${runPath}': ${err}`);
    process.exit(1);
  }
};
