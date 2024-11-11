import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		private configService: ConfigService,
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	existsByEmail(email: string) {
		return this.userRepository.existsBy({ email });
	}

	findByEmail(email: string) {
		return this.userRepository.findOneBy({ email });
	}

	async create(name: string, email: string, password: string) {
		return this.userRepository.save({
			name,
			email,
			password: await bcrypt.hash(password, +this.configService.get('PASSWORD_HASH_SALT')),
		});
	}

	comparePassword(password: string, encrypted: string) {
		return bcrypt.compare(password, encrypted);
	}
}
