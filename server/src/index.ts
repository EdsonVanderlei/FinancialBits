import { configDotenv } from 'dotenv';
import { App } from './app/app';
import { authFactory } from './auth/auth.factory';
import { authMiddleware } from './auth/infra/auth.middleware';
import { transactionsFactory } from './transactions/transactions.factory';
import knex from 'knex';
import config from '../knexfile';

configDotenv();

const port = parseInt(process.env.PORT!);
const secretKeys = { access: process.env.ACCESS_TOKEN_SECRET!, refresh: process.env.REFRESH_TOKEN_SECRET! };
const server = new App(port);

const knexInstance = knex(config.development);
const { authController, validateTokenUseCase } = authFactory(secretKeys, knexInstance);
const transactionsController = transactionsFactory(knexInstance);

server.setController(authController);
server.setController(transactionsController, [authMiddleware(validateTokenUseCase)]);
server.listen();
