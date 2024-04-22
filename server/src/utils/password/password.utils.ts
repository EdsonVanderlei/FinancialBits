import { compare, hash } from 'bcrypt';

export abstract class PasswordUtils {
	static async hash(password: string, rounds: number = 10) {
		return await hash(password, rounds);
	}
	static async validate(password: string, hashed: string) {
		return await compare(password, hashed);
	}
}
