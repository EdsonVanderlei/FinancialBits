import { Entity } from "../../core/entity";

export class User extends Entity {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public birthDate: Date,
    public phone: string,
    public lastName?: string
  ) {
    super();
  }
}
