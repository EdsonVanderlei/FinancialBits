// import { Session } from "../domain/entities/session";
// import { ValidationUtils } from "../utils/validation/validation.utils";
// import { SessionInMemoryRepository } from "./session-in-memory.repository";

// const getSession = (replace?: Partial<Session>) =>
//   ({
//     refreshToken:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
//     ...replace,
//   } as Session);

// describe("SessionInMemoryRepository", () => {
//   test("findAll", async () => {
//     const repository = new SessionInMemoryRepository();
//     const session = await repository.create(getSession());
//     const sessions = await repository.findAll();

//     expect(sessions).toContainEqual(session);
//   });

//   test("findByUserId", async () => {
//     const repository = new SessionInMemoryRepository();
//     const session = await repository.create(getSession());
//     const result = await repository.findOne({ userId: session.userId });

//     expect(result).toEqual(session);
//   });

//   test("create", async () => {
//     const repository = new SessionInMemoryRepository();
//     const session = await repository.create(getSession());
//     const validUuid = ValidationUtils.uuid(session.id);

//     expect(session).toBeInstanceOf(Session);
//     expect(validUuid).toBe(true);
//   });

//   test("update", async () => {
//     const repository = new SessionInMemoryRepository();
//     const session = await repository.create(getSession());

//     const accessToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmMxMjMiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.JO69ZGV8Pb7V3J7_O-fySk8Qh8ZSUI8mpOVusW7dTiU";
//     const result = await repository.update(
//       getSession({ refreshToken: accessToken, id: session.id })
//     );
//     const sessions = await repository.findAll();

//     expect(result?.id === session.id).toBe(true);
//     expect(result?.refreshToken).toEqual(accessToken);

//     expect(sessions).toContainEqual(result);
//     expect(sessions).not.toContainEqual(session);
//   });

//   test("delete", async () => {
//     const repository = new SessionInMemoryRepository();
//     const session = await repository.create(getSession());
//     const deletedSession = await repository.delete({ id: session.id });
//     const sessions = await repository.findAll();

//     expect(deletedSession).toEqual(session);
//     expect(sessions).not.toContainEqual(session);
//   });
// });
