import { SessionInMemoryRepository } from './domain/repositories/session/in-memory/session-in-memory.repository';
import { UserInMemoryRepository } from './domain/repositories/user/in-memory/user-in-memory.repository';
import { UserValidator } from './domain/validator/user.validator';
import { AuthController } from './infra/auth.controller';
import { LoginUseCase } from './use-cases/login/login.use-case';
import { LogoutUseCase } from './use-cases/logout/logout.use-case';
import { RefreshTokenUseCase } from './use-cases/refresh-token/refresh-token.use-case';
import { RegisterUseCase } from './use-cases/register/register.use-case';
import { ValidateTokenUseCase } from './use-cases/validate-token/validate-token.use-case';

export const authFactory = (secretKeys: { access: string; refresh: string }) => {
	const userRepository = new UserInMemoryRepository();
	const sessionRepository = new SessionInMemoryRepository();

	const userValidator = new UserValidator();

	const loginUserUseCase = new LoginUseCase(userRepository, sessionRepository, secretKeys);
	const logoutUserUseCase = new LogoutUseCase(sessionRepository, secretKeys.refresh);
	const registerUserUseCase = new RegisterUseCase(userRepository, sessionRepository, userValidator, secretKeys);
	const refreshTokenUseCase = new RefreshTokenUseCase(secretKeys);
	const validateTokenUseCase = new ValidateTokenUseCase(secretKeys.access);

	const authController = new AuthController(
		loginUserUseCase,
		logoutUserUseCase,
		registerUserUseCase,
		refreshTokenUseCase,
	);

	return { authController, validateTokenUseCase };
};
