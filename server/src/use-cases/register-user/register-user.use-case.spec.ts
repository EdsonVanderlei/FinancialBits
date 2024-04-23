import { SessionInMemoryRepository } from "../../data/repositories/sessionRepository";
import { UserInMemoryRepository } from "../../data/repositories/userRepository";
import { SessionService } from "../../domain/services/session.service";
import { UserService } from "../../domain/services/user.service";
import { GenerateTokensUseCase } from "../generate-tokens/generate-tokens.use-case";
import { RegisterUserUseCase } from "./register-user.use-case";

describe("RegisterUserUseCase", () => {
  test("exec", async () => {
    const userRepository = new UserInMemoryRepository();
    const sessionRepository = new SessionInMemoryRepository();

    const userService = new UserService(userRepository);
    const sessionService = new SessionService(sessionRepository);
    const generateTokensUseCase = new GenerateTokensUseCase(
      "accessSecret",
      "refreshSecret"
    );

    const useCase = new RegisterUserUseCase(
      userService,
      sessionService,
      generateTokensUseCase
    );
    const result = await useCase.exec({
      email: "john@doe.com",
      password: "abc123",
      firstName: "John",
      lastName: "Doe",
    });

    expect(result).toBeTruthy();
  });
});
