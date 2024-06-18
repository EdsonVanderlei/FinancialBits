import { configDotenv } from 'dotenv';
import { App } from './app/app';
import { authFactory } from './auth/auth.factory';
import { authMiddleware } from './auth/infra/auth.middleware';
import { transactionsFactory } from './transactions/transactions.factory';

configDotenv();

const port = parseInt(process.env.PORT!);
const secretKeys = { access: process.env.ACCESS_TOKEN_SECRET!, refresh: process.env.REFRESH_TOKEN_SECRET! };
const server = new App(port);

const { authController, validateTokenUseCase } = authFactory(secretKeys);
const transactionsController = transactionsFactory();

server.setController(authController);
server.setController(transactionsController, [authMiddleware(validateTokenUseCase)]);
server.listen();
