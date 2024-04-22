import { Entity } from '../core/entity';

export class User extends Entity {
	constructor(
		id: string | null,
		public email: string,
		public password: string,
		public firstName: string,
		public lastName?: string
	) {
		super(id);
	}
}
