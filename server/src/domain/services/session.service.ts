import { Repository } from "../../data/interfaces/irepository";
import { ServerError } from "../../core/server-error";
import { Session } from "../entities/session";
import { ValidationUtils } from "../../utils/validation/validation.utils";

export class SessionService {
  constructor(private sessionRepository: Repository<Session>) {}

  async findOne(where: Partial<Session>) {
    if (!where.id && !where.userId && !where.refreshToken) {
      throw new ServerError("no parameters were provided", 400);
    }

    if (where.id && !ValidationUtils.uuid(where.id)) {
      throw new ServerError("invalid session identifier", 400);
    }

    if (where.userId && !ValidationUtils.uuid(where.userId)) {
      throw new ServerError("invalid user identifier", 400);
    }

    if (where.refreshToken && !ValidationUtils.jwt(where.refreshToken)) {
      throw new ServerError("invalid refresh token", 400);
    }

    const Session = await this.sessionRepository.findOne(where);

    if (!Session) {
      throw new ServerError("session not found", 404);
    }
    return Session;
  }

  async save(session: Omit<Session, "id">) {
    if (!ValidationUtils.jwt(session.refreshToken)) {
      throw new ServerError("invalid refresh token", 400);
    }

    if (!ValidationUtils.uuid(session.userId)) {
      throw new ServerError("invalid user identifier", 400);
    }

    let result = await this.sessionRepository.findOne({
      userId: session.userId,
    });

    if (!result)
      result = await this.sessionRepository.create({
        userId: session.userId,
        refreshToken: session.refreshToken,
      });
    else
      result = await this.sessionRepository.update({
        id: result.id,
        userId: result.userId,
        refreshToken: session.refreshToken,
      });

    if (!result) {
      throw new ServerError("couldn't save the session", 500);
    }
    return result;
  }

  async delete(where: Partial<Pick<Session, "id" | "userId">>) {
    if (!where.id && !where.userId) {
      throw new ServerError("no parameters were provided", 400);
    }

    if (where.id && !ValidationUtils.uuid(where.id)) {
      throw new ServerError("invalid identifier", 400);
    }

    if (where.userId && !ValidationUtils.uuid(where.userId)) {
      throw new ServerError("invalid user identifier", 400);
    }

    const session = await this.sessionRepository.delete(where);

    if (!session) {
      throw new ServerError("session not found", 404);
    }
    return session;
  }
}
