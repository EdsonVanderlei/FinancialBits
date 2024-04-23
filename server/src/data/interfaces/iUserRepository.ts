import { User } from "../../domain/entities/user";
import { IRepository } from "./irepository";

export interface IUserRepository extends IRepository<User> {}
