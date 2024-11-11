export type TokenPayload = {
	sub: string;
	user: {
		name: string;
		email: string;
	};
	iat: number;
	exp?: number;
};
