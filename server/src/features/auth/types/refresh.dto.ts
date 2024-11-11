import { IsJWT } from 'class-validator';

export class RefreshRequestDTO {
	@IsJWT()
	refreshToken: string;
}

export class RefreshResponseDTO {
	accessToken: string;
}
