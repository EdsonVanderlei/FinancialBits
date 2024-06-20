export type LoginUseCaseInput = { email: string; password: string };

export type LoginUseCaseOutput = {
	tokens: { access: string; refresh: string };
	user: {
		id: string;
		email: string;
		firstName: string;
		lastName?: string;
		createdAt: Date;
		updatedAt?: Date;
	};
};
