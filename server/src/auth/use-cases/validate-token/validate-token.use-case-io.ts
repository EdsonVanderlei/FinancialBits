import { JWTPayload } from '../../domain/data-objects/jwt/jwt';

export type ValidateTokenUseCaseInput = { authorizationHeader: string };

export type ValidateTokenUseCaseOutput = JWTPayload;
