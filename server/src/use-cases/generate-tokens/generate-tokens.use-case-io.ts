export type GenerateTokensUseCaseInput = {
	refreshToken?: string;
	accessExpiresIn?: string;
	payload: { sub: string; name: string };
};

export type GenerateTokensUseCaseOutput = {
	access: string;
	refresh: string;
};
