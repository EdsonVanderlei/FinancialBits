import { UUID } from '../data-objects/uuid/uuid';
import { Validator } from '../validator/validator';

export abstract class Entity {
	public id!: UUID;

	validate(validator: Validator<typeof this>) {
		validator.validate(this);
	}
}
