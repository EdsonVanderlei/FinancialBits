import { Entity } from '../core/entity';

export class Session extends Entity {
	constructor(id: string | null, public userId: string, public refreshToken: string) {
		super(id);
	}
}
