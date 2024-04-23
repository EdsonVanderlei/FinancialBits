import { User } from "../../domain/entities/user";
import { SessionInMemoryRepository } from "../../data/repositories/sessionRepository";
import { UserInMemoryRepository } from "../../data/repositories/userRepository";
import { SessionService } from "../../domain/services/session.service";
import { UserService } from "../../domain/services/user.service";
import { PasswordUtils } from "../../utils/password/password.utils";
import { LogoutUserUseCase } from "./logout-user.use-case";

const getUser = async (hashPassword: boolean) => {
  const user = {
    email: "john@doe.com",
    password: "abc123",
    firstName: "John",
    lastName: "Doe",
  };
  if (hashPassword) user.password = await PasswordUtils.hash(user.password);
  return user;
};

const getUseCase = async (user?: Omit<User, "id">) => {
  const userRepository = new UserInMemoryRepository();
  const sessionRepository = new SessionInMemoryRepository();

  const userService = new UserService(userRepository);
  const sessionService = new SessionService(sessionRepository);

  if (!!user) {
    const result = await userRepository.create(user);
    await sessionRepository.create({
      userId: result.id!,
      refreshToken: "refreshToken",
    });
  }

  return new LogoutUserUseCase(userService, sessionService);
};

describe("LogoutUserUseCase", () => {
  test("exec", async () => {
    const user = await getUser(true);
    const useCase = await getUseCase(user);

    const result = await useCase.exec({ email: user.email });

    expect(result).toBeTruthy();
  });
});
