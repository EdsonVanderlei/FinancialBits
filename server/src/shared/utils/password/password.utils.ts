import { compareSync, hashSync } from 'bcrypt';

export abstract class PasswordUtils {
	static hash(password: string, rounds: number = 10) {
		return hashSync(password, rounds);
	}
	static validate(password: string, hashed: string) {
		return compareSync(password, hashed);
	}
}
