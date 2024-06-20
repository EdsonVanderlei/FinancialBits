export class AppError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		const msg = message.charAt(0).toUpperCase() + message.slice(1);
		super(msg);
		this.statusCode = statusCode;
	}
}
