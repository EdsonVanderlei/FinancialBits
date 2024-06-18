import { configDotenv } from 'dotenv';
import { SessionInMemoryRepository } from './domain/repositories/session/in-memory/session-in-memory.repository';
import { TransactionInMemoryRepository } from './domain/repositories/transaction/in-memory/transaction-in-memory.repository';
import { UserInMemoryRepository } from './domain/repositories/user/in-memory/user-in-memory.repository';
import { TransactionValidator } from './domain/validator/transaction/transaction.validator';
import { UserValidator } from './domain/validator/user/user.validator';
import { App } from './infra/app';
import { AuthController } from './infra/controllers/auth.controller';
import { TransactionsController } from './infra/controllers/transactions.controller';
import { authMiddleware } from './infra/middlewares/auth.middleware';
import { LoginUseCase } from './use-cases/auth/login/login.use-case';
import { LogoutUseCase } from './use-cases/auth/logout/logout.use-case';
import { RefreshTokenUseCase } from './use-cases/auth/refresh-token/refresh-token.use-case';
import { RegisterUseCase } from './use-cases/auth/register/register.use-case';
import { ValidateTokenUseCase } from './use-cases/auth/validate-token/validate-token.use-case';
import { CreateTransactionUseCase } from './use-cases/transactions/create/create-transaction.use-case';
import { DeleteTransactionUseCase } from './use-cases/transactions/delete/delete-transaction.use-case';
import { UpdateTransactionUseCase } from './use-cases/transactions/update/update-transaction.use-case';
import { FindTransactionsByDateRangeUseCase } from './use-cases/transactions/find-by-date-range/find-transactions-by-date-range.use-case';

configDotenv();
const port = parseInt(process.env.PORT!);
const secretKeys = { access: process.env.ACCESS_TOKEN_SECRET!, refresh: process.env.REFRESH_TOKEN_SECRET! };

const server = new App(port);

const userRepository = new UserInMemoryRepository();
const sessionRepository = new SessionInMemoryRepository();
const transactionRepository = new TransactionInMemoryRepository();

const userValidator = new UserValidator();
const transactionValidator = new TransactionValidator();

const loginUserUseCase = new LoginUseCase(userRepository, sessionRepository, secretKeys);
const logoutUserUseCase = new LogoutUseCase(sessionRepository, secretKeys.refresh);
const registerUserUseCase = new RegisterUseCase(userRepository, sessionRepository, userValidator, secretKeys);
const refreshTokenUseCase = new RefreshTokenUseCase(secretKeys);
const validateTokenUseCase = new ValidateTokenUseCase(secretKeys.access);

const findTransactionsByDateRangeUseCase = new FindTransactionsByDateRangeUseCase(transactionRepository);
const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, transactionValidator);
const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository, transactionValidator);
const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);

const authController = new AuthController(
	loginUserUseCase,
	logoutUserUseCase,
	registerUserUseCase,
	refreshTokenUseCase,
);
const transactionsController = new TransactionsController(
	findTransactionsByDateRangeUseCase,
	createTransactionUseCase,
	updateTransactionUseCase,
	deleteTransactionUseCase,
);

server.setController(authController);
server.setController(transactionsController, [authMiddleware(validateTokenUseCase)]);
server.listen();
