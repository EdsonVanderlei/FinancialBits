import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDTO {
	@IsEmail()
	email: string;
	@IsNotEmpty()
	password: string;
}

export class LoginResponseDTO {
	tokens: { accessToken: string; refreshToken: string };
	user: { name: string; email: string };
}
