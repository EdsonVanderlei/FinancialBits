import { configDotenv } from 'dotenv';
import { SessionInMemoryRepository } from './domain/repositories/in-memory/session/session-in-memory.repository';
import { UserInMemoryRepository } from './domain/repositories/in-memory/user/user-in-memory.repository';
import { App } from './infra/app';
import { AuthController } from './infra/controllers/auth.controller';

configDotenv();
const port = parseInt(process.env.PORT!);
const accessSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET!;

const server = new App(port);

const userRepository = new UserInMemoryRepository();
const sessionRepository = new SessionInMemoryRepository();

server.setController(
	AuthController,
	{ access: accessSecret, refresh: refreshSecret },
	{ user: userRepository, session: sessionRepository }
);

server.listen();
