import { AuthMiddleware } from './infra/middlewares/auth.middleware';
import { configDotenv } from 'dotenv';
import { SessionInMemoryRepository } from './domain/repositories/in-memory/session/session-in-memory.repository';
import { TransactionInMemoryRepository } from './domain/repositories/in-memory/transaction/transaction-in-memory.repository';
import { UserInMemoryRepository } from './domain/repositories/in-memory/user/user-in-memory.repository';
import { App } from './infra/app';
import { AuthController } from './infra/controllers/auth.controller';
import { TransactionsController } from './infra/controllers/transactions.controller';

configDotenv();
const port = parseInt(process.env.PORT!);
const accessSecretKey = process.env.ACCESS_TOKEN_SECRET!;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET!;

const server = new App(port);
const userRepository = new UserInMemoryRepository();
const sessionRepository = new SessionInMemoryRepository();
const transactionRepository = new TransactionInMemoryRepository();

const authMiddleware = new AuthMiddleware(accessSecretKey);

server.setController(new AuthController(accessSecretKey, refreshSecretKey, userRepository, sessionRepository));
server.setController(new TransactionsController(userRepository, transactionRepository), [authMiddleware.exec]);

server.listen();
