import { JWT } from '../../data-objects/jwt/jwt';
import { UUID } from '../../data-objects/uuid/uuid';

export type LoadSessionProps = {
	id: UUID;
	userId: UUID;
	refreshToken: JWT;
	createdAt: number;
	updatedAt?: number;
};
