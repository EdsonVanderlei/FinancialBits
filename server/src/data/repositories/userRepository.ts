import { GenericRepository } from "../GenericRepository";
import { IUserRepository } from "../interfaces/iUserRepository";
import { User } from "../../domain/entities/user";
import { UuidUtils } from "../../utils/uuid/uuid.utils";

export class UserRepository
  extends GenericRepository<User>
  implements IUserRepository
{
  async create(value: Omit<User, "id">) {
    const user = new User(
      value.email,
      value.password,
      value.firstName,
      value.birthDate,
      value.phone,
      value.lastName
    );
    this._values.push(user);

    return user;
  }

  async update(value: User) {
    const user = await this.findOne({ id: value.id });
    if (!user) {
      return null;
    }

    this._values.splice(this._values.indexOf(user), 1);

    const newUser = new User(
      value.email,
      value.password,
      value.firstName,
      value.birthDate,
      value.phone,
      value.lastName
    );
    this._values.push(newUser);

    return newUser;
  }

  async delete(where: Partial<User>) {
    const user = await this.findOne(where);
    if (!user) {
      return null;
    }

    this._values.splice(this._values.indexOf(user), 1);
    return user;
  }
}
