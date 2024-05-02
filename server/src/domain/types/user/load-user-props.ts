import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { UUID } from '../../data-objects/uuid/uuid';

export type LoadUserProps = {
	id: UUID;
	email: Email;
	password: Password;
	firstName: string;
	lastName?: string;
};
