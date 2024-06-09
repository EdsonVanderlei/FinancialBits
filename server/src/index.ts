import { configDotenv } from 'dotenv';
import { SessionInMemoryRepository } from './domain/repositories/session/in-memory/session-in-memory.repository';
import { TransactionInMemoryRepository } from './domain/repositories/transaction/in-memory/transaction-in-memory.repository';
import { UserInMemoryRepository } from './domain/repositories/user/in-memory/user-in-memory.repository';
import { App } from './infra/app';
import { AuthController } from './infra/controllers/auth.controller';
import { BudgetsController } from './infra/controllers/budgets.controller';
import { TransactionsController } from './infra/controllers/transactions.controller';
import { authMiddleware } from './infra/middlewares/auth.middleware';
import { LoginUseCase } from './use-cases/auth/login/login.use-case';
import { LogoutUseCase } from './use-cases/auth/logout/logout.use-case';
import { RefreshTokenUseCase } from './use-cases/auth/refresh-token/refresh-token.use-case';
import { RegisterUseCase } from './use-cases/auth/register/register.use-case';
import { ValidateTokenUseCase } from './use-cases/auth/validate-token/validate-token.use-case';
import { FindBudgetByDateRangeUseCase } from './use-cases/budget/find-by-date-range/find-budget-by-date-range.use-case';
import { CreateTransactionUseCase } from './use-cases/transactions/create/create-transaction.use-case';
import { DeleteTransactionUseCase } from './use-cases/transactions/delete/delete-transaction.use-case';
import { FindTransactionByIdUseCase } from './use-cases/transactions/find-by-id/find-transaction-by-id.use-case';
import { UpdateTransactionUseCase } from './use-cases/transactions/update/update-transaction.use-case';
import { CreateUserValidator } from './domain/validator/user/create-user.validator';
import { CreateTransactionValidator } from './domain/validator/transaction/create-transaction.validator';

configDotenv();
const port = parseInt(process.env.PORT!);
const secretKeys = { access: process.env.ACCESS_TOKEN_SECRET!, refresh: process.env.REFRESH_TOKEN_SECRET! };

const server = new App(port);

const userRepository = new UserInMemoryRepository();
const sessionRepository = new SessionInMemoryRepository();
const transactionRepository = new TransactionInMemoryRepository();

const createUserValidator = new CreateUserValidator();
const createTransactionValidator = new CreateTransactionValidator();

const loginUserUseCase = new LoginUseCase(userRepository, sessionRepository, secretKeys);
const logoutUserUseCase = new LogoutUseCase(sessionRepository);
const registerUserUseCase = new RegisterUseCase(userRepository, sessionRepository, createUserValidator, secretKeys);
const refreshTokenUseCase = new RefreshTokenUseCase(secretKeys);
const validateTokenUseCase = new ValidateTokenUseCase(secretKeys.access);

const findTransactionByIdUseCase = new FindTransactionByIdUseCase(transactionRepository);
const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, createTransactionValidator);
const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository, findTransactionByIdUseCase);
const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository, findTransactionByIdUseCase);

const findBudgetByDateRangeUseCase = new FindBudgetByDateRangeUseCase(transactionRepository);

server.setController(new AuthController(loginUserUseCase, logoutUserUseCase, registerUserUseCase, refreshTokenUseCase));
server.setController(
	new TransactionsController(createTransactionUseCase, updateTransactionUseCase, deleteTransactionUseCase),
	[authMiddleware(validateTokenUseCase)]
);
server.setController(new BudgetsController(findBudgetByDateRangeUseCase), [authMiddleware(validateTokenUseCase)]);

server.listen();
