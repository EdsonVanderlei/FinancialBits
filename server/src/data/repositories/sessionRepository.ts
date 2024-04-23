import { GenericRepository } from "../GenericRepository";
import { ISessionRepository } from "../interfaces/ISessionRepository";
import { Session } from "../../domain/entities/session";

export class SessionInMemoryRepository
  extends GenericRepository<Session>
  implements ISessionRepository
{
  async create(value: Omit<Session, "id">) {
    const session = new Session(value.userId, value.refreshToken);
    this._values.push(session);

    return session;
  }

  async update(value: Session) {
    const session = await this.findOne({ id: value.id });
    if (!session) {
      return null;
    }

    this._values.splice(this._values.indexOf(session), 1);
    const newSession = new Session(value.userId, value.refreshToken);
    this._values.push(newSession);

    return newSession;
  }

  async delete(where: Partial<Session>) {
    const session = await this.findOne(where);
    if (!session) {
      return null;
    }

    this._values.splice(this._values.indexOf(session), 1);
    return session;
  }
}
