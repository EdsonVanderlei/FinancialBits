export type RegisterUseCaseInput = {
	email: string;
	password: string;
	firstName: string;
	lastName?: string;
};

export type RegisterUseCaseOutput = {
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
