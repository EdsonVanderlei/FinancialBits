export type LoginUserUseCaseInput = {
	email: string;
	password: string;
};

export type LoginUserUseCaseOutput = {
	tokens: { access: string; refresh: string };
	user: { email: string; firstName: string; lastName?: string };
};
