import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterRequestDTO {
	@IsNotEmpty()
	name: string;
	@IsEmail()
	email: string;
	@IsNotEmpty()
	password: string;
}

export class RegisterResponseDTO {
	tokens: { accessToken: string; refreshToken: string };
	user: { name: string; email: string };
}
