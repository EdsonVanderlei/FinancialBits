import { Repository } from "../../data/interfaces/irepository";
import { ServerError } from "../../core/server-error";
import { User } from "../entities/user";
import { PasswordUtils } from "../../utils/password/password.utils";
import { ValidationUtils } from "../../utils/validation/validation.utils";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

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
    user: Omit<User, "id"> & Partial<Pick<User, "id">>,
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

    if (user.id && !(await this.userRepository.exists({ id: user.id }))) {
      throw new ServerError("user not found", 404);
    }

    if (hashPassword) {
      user.password = await PasswordUtils.hash(user.password);
    }

    let result: User | null;
    if (user.id) {
      result = await this.userRepository.update({
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      result = await this.userRepository.create({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }

    if (!result) {
      throw new ServerError("couldn't create the user", 500);
    }
    return {
      id: result.id,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
    };
  }
}
