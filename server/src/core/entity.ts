import { UuidUtils } from "../utils/uuid/uuid.utils";

export class Entity {
  public id: string;

  constructor() {
    this.id = UuidUtils.generate();
  }
}
