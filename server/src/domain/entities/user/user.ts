import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { UUID } from '../../data-objects/uuid/uuid';
import { Entity } from '../entity';

export class User extends Entity {
	public email!: Email;
	public password!: Password;
	public firstName!: string;
	public lastName?: string;

	public get fullName() {
		return `${this.firstName}${this.lastName ? ' ' + this.lastName : ''}`;
	}

	private constructor() {
		super();
	}

	static create(email: string, password: string, firstName: string, lastName?: string) {
		const user = new User();

		user.id = new UUID();
		user.email = new Email(email);
		user.password = new Password(password);
		user.firstName = firstName;
		user.lastName = lastName;

		return user;
	}

	static restore(
		id: UUID,
		email: Email,
		password: Password,
		firstName: string,
		lastName?: string
	) {
		const user = new User();

		user.id = id;
		user.email = email;
		user.password = password;
		user.firstName = firstName;
		user.lastName = lastName;

		return user;
	}
}
