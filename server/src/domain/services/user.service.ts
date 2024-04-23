import { ServerError } from "../../core/server-error";
import { User } from "../entities/user";
import { PasswordUtils } from "../../utils/password/password.utils";
import { ValidationUtils } from "../../utils/validation/validation.utils";
import { IUserRepository } from "../../data/interfaces/iUserRepository";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async findOne(where: Partial<Pick<User, "id" | "email">>) {
    if (!where.id && !where.email) {
      throw new ServerError("no parameters were provided", 400);
    }

    if (where.id && !ValidationUtils.uuid(where.id)) {
      throw new ServerError("invalid user identifier", 400);
    }

    if (where.email && !ValidationUtils.email(where.email)) {
      throw new ServerError("invalid user email", 400);
    }

    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new ServerError("user not found", 404);
    }
    return user;
  }

  async save(
    user: User,
    hashPassword: boolean = true
  ): Promise<Omit<User, "password">> {
    if (!ValidationUtils.minLength(user.password, 4)) {
      throw new ServerError("password length must be greater than 4", 400);
    }

    if (!ValidationUtils.email(user.email)) {
      throw new ServerError("invalid email", 400);
    }

    if (await this.userRepository.exists({ email: user.email })) {
      throw new ServerError("email already in use", 400);
    }

    if (hashPassword) {
      user.password = await PasswordUtils.hash(user.password);
    }

    let result: User | null;
    if (await this.userRepository.exists({ id: user.id })) {
      result = await this.userRepository.update(user);
    } else {
      result = await this.userRepository.create(user);
    }

    if (!result) {
      throw new ServerError("couldn't create the user", 500);
    }
    return result;
  }
}
