import { UUID } from '../data-objects/uuid/uuid';
import { Validator } from '../validator/validator';

export abstract class Entity {
	public id!: UUID;

	public validate(validator: Validator<typeof this>) {
		validator.validate(this);
	}
}
