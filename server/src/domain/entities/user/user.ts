import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { UUID } from '../../data-objects/uuid/uuid';
import { CreateUserProps } from '../../types/user/create-user-props';
import { LoadUserProps } from '../../types/user/load-user-props';
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

	static create(props: CreateUserProps) {
		const user = new User();
		user.id = new UUID();
		user.email = props.email;
		user.password = props.password;
		user.firstName = props.firstName;
		user.lastName = props.lastName;
		return user;
	}

	static load(props: LoadUserProps) {
		const user = new User();
		user.id = props.id;
		user.email = props.email;
		user.password = props.password;
		user.firstName = props.firstName;
		user.lastName = props.lastName;
		return user;
	}

	public comparePassword(target: string) {
		return this.password.compare(target);
	}
}
