import { Knex } from 'knex';
import { UserKnexRepository } from './domain/repositories/user-knex.repository';
import { UserValidator } from './domain/validator/user.validator';
import { AuthController } from './infra/auth.controller';
import { LoginUseCase } from './use-cases/login/login.use-case';
import { RefreshTokenUseCase } from './use-cases/refresh-token/refresh-token.use-case';
import { RegisterUseCase } from './use-cases/register/register.use-case';
import { ValidateTokenUseCase } from './use-cases/validate-token/validate-token.use-case';

export const authFactory = (secretKeys: { access: string; refresh: string }, knexInstance?: Knex) => {
	const userRepository = new UserKnexRepository(knexInstance!);
	const userValidator = new UserValidator();

	const loginUserUseCase = new LoginUseCase(userRepository, secretKeys);
	const registerUserUseCase = new RegisterUseCase(userRepository, userValidator, secretKeys);
	const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, secretKeys);
	const validateTokenUseCase = new ValidateTokenUseCase(secretKeys.access);

	const authController = new AuthController(loginUserUseCase, registerUserUseCase, refreshTokenUseCase);

	return { authController, validateTokenUseCase };
};
