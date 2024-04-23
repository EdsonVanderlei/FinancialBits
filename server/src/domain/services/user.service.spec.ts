import { ServerError } from "../../core/server-error";
import { User } from "../entities/user";
import { UserInMemoryRepository } from "../../data/repositories/userRepository";
import { UserService } from "./user.service";

const getUser = (replace?: Partial<User>) =>
  ({
    email: "john@doe.com",
    password: "abc123",
    firstName: "John",
    lastName: "Doe",
    ...replace,
  } as User);

describe("UserService", () => {
  describe("findOne", () => {
    test("find by id", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);
      let user = getUser();
      user = await repository.create(user);

      const result = await service.findOne({ id: user.id });

      expect(result).toEqual(user);
    });
    test("find by email", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);
      let user = getUser();
      user = await repository.create(user);

      const result = await service.findOne({ email: user.email });

      expect(result).toEqual(user);
    });
    test("no parameters", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);

      service.findOne({}).catch((e) => {
        expect(e).toBeInstanceOf(ServerError);
        expect(e.code).toEqual(400);
        expect(e.message).toEqual("no parameters were provided");
      });
    });
    test("invalid userId", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);

      service.findOne({ id: "123" }).catch((e) => {
        expect(e).toBeInstanceOf(ServerError);
        expect(e.code).toEqual(400);
        expect(e.message).toEqual("invalid user identifier");
      });
    });
    test("invalid email", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);

      service.findOne({ email: "www.test.com" }).catch((e) => {
        expect(e).toBeInstanceOf(ServerError);
        expect(e.code).toEqual(400);
        expect(e.message).toEqual("invalid user email");
      });
    });
    test("user not found", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);

      service.findOne({ email: "johndoe@test.com" }).catch((e) => {
        expect(e).toBeInstanceOf(ServerError);
        expect(e.code).toEqual(404);
        expect(e.message).toEqual("user not found");
      });
    });
  });
  describe("save", () => {
    test("create", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);
      const user = getUser();

      const result = await service.save(user);

      expect(result).toBeTruthy();
    });
    test("update", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);
      let user = getUser();
      user = await repository.create(user);

      const result = await service.save({ ...user, email: "johndoe@test.com" });

      expect(result).toBeTruthy();
      expect(result.email !== user.email).toBe(true);
    });
    test("not found", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);
      const user = getUser({ id: "b709e202-bc62-4e53-85c5-674cc66c71fb" });

      service.save(user).catch((err) => {
        expect(err).toBeInstanceOf(ServerError);
        expect(err.code).toBe(404);
        expect(err.message).toEqual("user not found");
      });
    });
    test("low length password", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);
      const user = getUser({ password: "1b" });

      service.save(user).catch((err) => {
        expect(err).toBeInstanceOf(ServerError);
        expect(err.code).toBe(400);
        expect(err.message).toEqual("password length must be greater than 4");
      });
    });
    test("invalid email", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);
      const user = getUser({ email: "www.test.com" });

      service.save(user).catch((err) => {
        expect(err).toBeInstanceOf(ServerError);
        expect(err.code).toBe(400);
        expect(err.message).toEqual("invalid email");
      });
    });
    test("email already in use", async () => {
      const repository = new UserInMemoryRepository();
      const service = new UserService(repository);
      const user = getUser();
      await service.save(user);

      service.save(user, false).catch((err) => {
        expect(err).toBeInstanceOf(ServerError);
        expect(err.code).toBe(400);
        expect(err.message).toEqual("email already in use");
      });
    });
  });
});
