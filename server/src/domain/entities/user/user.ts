import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { UUID } from '../../data-objects/uuid/uuid';
import { CreateUserValidator } from '../../validator/user/create-user.validator';
import { Entity } from '../entity';
import { Timestamps } from './../../data-objects/timestamps/timestamps';

export class User extends Entity {
	public email!: Email;
	public password!: Password;
	public firstName!: string;
	public lastName?: string;
	public timestamps!: Timestamps;

	public get fullName() {
		return `${this.firstName}${this.lastName ? ' ' + this.lastName : ''}`;
	}

	private constructor() {
		super();
	}

	static create(props: {
		email: Email;
		password: Password;
		firstName: string;
		lastName?: string;
	}) {
		const user = new User();
		user.id = new UUID();
		user.email = props.email;
		user.password = props.password;
		user.firstName = props.firstName;
		user.lastName = props.lastName;
		user.timestamps = new Timestamps();
		return user;
	}

	static load(props: {
		id: UUID;
		email: Email;
		password: Password;
		firstName: string;
		lastName?: string;
		timestamps: Timestamps;
	}) {
		const user = new User();
		user.id = props.id;
		user.email = props.email;
		user.password = props.password;
		user.firstName = props.firstName;
		user.lastName = props.lastName;
		user.timestamps = props.timestamps;
		return user;
	}

	public comparePassword(target: string) {
		return this.password.compare(target);
	}

	public validateCreate() {
		const validator = new CreateUserValidator();
		this.validate(validator);
	}
}
