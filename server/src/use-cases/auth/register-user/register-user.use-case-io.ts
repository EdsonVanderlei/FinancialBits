import { User } from '../../../domain/entities/user/user';

export type RegisterUserUseCaseInput = {
	email: string;
	password: string;
	firstName: string;
	lastName?: string;
};

export type RegisterUserUseCaseOutput = {
	tokens: { access: string; refresh: string };
	user: { email: string; firstName: string; lastName?: string };
};
