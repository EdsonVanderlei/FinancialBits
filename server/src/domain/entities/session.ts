import { Entity } from "../../core/entity";

export class Session extends Entity {
  constructor(public userId: string, public refreshToken: string) {
    super();
  }
}
