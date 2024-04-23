import { ServerError } from "../../core/server-error";
import { User } from "../../domain/entities/user";
import { SessionInMemoryRepository } from "../../data/repositories/sessionRepository";
import { UserInMemoryRepository } from "../../data/repositories/userRepository";
import { SessionService } from "../../domain/services/session.service";
import { UserService } from "../../domain/services/user.service";
import { PasswordUtils } from "../../utils/password/password.utils";
import { GenerateTokensUseCase } from "../generate-tokens/generate-tokens.use-case";
import { LoginUserUseCase } from "./login-user.use-case";

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
  const generateTokensUseCase = new GenerateTokensUseCase(
    "accessSecret",
    "refreshSecret"
  );

  if (!!user) await userRepository.create(user);

  return new LoginUserUseCase(
    userService,
    sessionService,
    generateTokensUseCase
  );
};

describe("LoginUserUseCase", () => {
  test("exec", async () => {
    const user = await getUser(true);
    const useCase = await getUseCase(user);

    const result = await useCase.exec({
      email: "john@doe.com",
      password: "abc123",
    });

    expect(result).toBeTruthy();
  });
  test("invalid credentials", async () => {
    const user = await getUser(true);
    const useCase = await getUseCase(user);

    useCase.exec({ email: "john@doe.com", password: "abc1234" }).catch((e) => {
      expect(e).toBeInstanceOf(ServerError);
      expect(e.code).toEqual(400);
      expect(e.message).toEqual("invalid credentials");
    });
  });
});
