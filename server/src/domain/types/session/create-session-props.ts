import { JWT } from '../../data-objects/jwt/jwt';
import { UUID } from '../../data-objects/uuid/uuid';

export type CreateSessionProps = {
	userId: UUID;
	refreshToken: JWT;
};
