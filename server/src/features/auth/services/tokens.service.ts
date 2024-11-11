import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../types/token-payload';

@Injectable()
export class TokensService {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}

	private _generatePayload(id: string, name: string, email: string): Omit<TokenPayload, 'iat' | 'exp'> {
		return { sub: id, user: { name, email } };
	}

	generateAccessToken(id: string, name: string, email: string) {
		return this.jwtService.signAsync(this._generatePayload(id, name, email), {
			expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
			secret: this.configService.get('JWT_ACCESS_SECRET'),
		});
	}

	generateRefreshToken(id: string, name: string, email: string) {
		return this.jwtService.signAsync(this._generatePayload(id, name, email), {
			secret: this.configService.get('JWT_REFRESH_SECRET'),
		});
	}

	async generateTokens(id: string, name: string, email: string) {
		return {
			accessToken: await this.generateAccessToken(id, name, email),
			refreshToken: await this.generateRefreshToken(id, name, email),
		};
	}

	async verifyAccessToken(token: string): Promise<TokenPayload> {
		return this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT_ACCESS_SECRET') });
	}

	async verifyRefreshToken(token: string): Promise<TokenPayload> {
		return this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT_REFRESH_SECRET') });
	}
}
