import { GenericRepository } from "../GenericRepository";
import { IUserRepository } from "../interfaces/iUserRepository";
import { User } from "../../domain/entities/user";

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

    const [removed] = this._values.splice(this._values.indexOf(user), 1);

    Object.entries(value).forEach(([key, value]) => {
      if (key == "id") return;
      removed[key as keyof User] = value;
    });
    this._values.push(removed);
    return removed;
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
