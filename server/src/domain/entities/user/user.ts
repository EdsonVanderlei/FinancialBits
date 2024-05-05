import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { UUID } from '../../data-objects/uuid/uuid';
import { Entity } from '../entity';

export class User extends Entity {
	public email!: Email;
	public password!: Password;
	public firstName!: string;
	public lastName?: string;
	public createdAt!: number;
	public updatedAt?: number;

	public get fullName() {
		return `${this.firstName}${this.lastName ? ' ' + this.lastName : ''}`;
	}

	private constructor() {
		super();
	}

	static create(props: { email: Email; password: Password; firstName: string; lastName?: string }) {
		const user = new User();
		user.id = new UUID();
		user.email = props.email;
		user.password = props.password;
		user.firstName = props.firstName;
		user.lastName = props.lastName;
		user.createdAt = new Date().getTime();
		return user;
	}

	static load(props: {
		id: UUID;
		email: Email;
		password: Password;
		firstName: string;
		createdAt: number;
		lastName?: string;
		updatedAt?: number;
	}) {
		const user = new User();
		user.id = props.id;
		user.email = props.email;
		user.password = props.password;
		user.firstName = props.firstName;
		user.lastName = props.lastName;
		user.createdAt = props.createdAt;
		user.updatedAt = props.updatedAt;
		return user;
	}

	public comparePassword(target: string) {
		return this.password.compare(target);
	}
}
