import { ValidationUtils } from "../validation/validation.utils";
import { TokenUtils } from "./token.utils";

describe("TokenUtils", () => {
  test("generate valid", async () => {
    const secret = "secret";
    const payload = { email: "johndoe@test.com" };
    const token = TokenUtils.generate(payload, secret);

    expect(ValidationUtils.jwt(token)).toBe(true);
  });

  test("generate invalid secret", async () => {
    const payload = { email: "johndoe@test.com" };

    expect(() => TokenUtils.generate(payload, "")).toThrow({
      message: "secretOrPrivateKey must have a value",
    } as Error);
  });

  test("verify valid", async () => {
    const secret = "secret";
    const payload = { email: "johndoe@test.com" };
    const token = TokenUtils.generate(payload, secret);

    expect(TokenUtils.decode(token ?? "", secret)?.email ?? "").toEqual(
      payload.email
    );
  });

  test("verify invalid", async () => {
    const secret = "secret";
    const token = "abc";

    expect(() => TokenUtils.decode(token, secret)).toThrow({
      message: "jwt malformed",
    } as Error);
  });

  test("verify expirated", async () => {
    const secret = "accessSecret";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiIxMjMiLCJpYXQiOjE3MTM3OTMxODMsImV4cCI6MTcxMzc5MzE5M30.MhgESSWWqx_nDmGq599CuodyYidpB8lUbdCX-ho9Rxg";

    expect(() => TokenUtils.decode(token, secret)).toThrow({
      message: "jwt expired",
    } as Error);
  });
});
