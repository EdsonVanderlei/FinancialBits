import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';

export type CreateUserProps = {
	email: Email;
	password: Password;
	firstName: string;
	lastName?: string;
};
