import { HttpException, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationOptions: ValidationPipeOptions = {
	transform: true,
	transformOptions: {enableImplicitConversion: true},
	exceptionFactory: (errors: ValidationError[]) => {
		const message = Object.values(errors[0].constraints)[0];
		return message ? new HttpException(message, 400) : new HttpException('internal server error', 500);
	},
};
