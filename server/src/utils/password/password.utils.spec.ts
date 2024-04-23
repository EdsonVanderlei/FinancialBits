import { PasswordUtils } from "./password.utils";

describe("PasswordUtils", () => {
  test("hash", async () => {
    const password = "abc123";
    const hashed = await PasswordUtils.hash(password);
    expect(password === hashed).toBe(false);
  });

  test("valid", async () => {
    const password = "abc123";
    const hashed = await PasswordUtils.hash(password);

    const result = await PasswordUtils.validate(password, hashed);
    expect(result).toBe(true);
  });

  test("invalid", async () => {
    const password = "abc123";
    const hashed = await PasswordUtils.hash("abcd1234");

    const result = await PasswordUtils.validate(password, hashed);
    expect(result).toBe(false);
  });
});
