import { Knex } from 'knex';

export class KnexRepository {
	constructor(
		protected knex: Knex,
		protected tableName: string,
	) {}

	protected dateToDatetime(date?: Date) {
		if (!date) return null;
		const res = date.toISOString().slice(0, 19).replace('T', ' ');
		console.log(res);
		return res;
	}

	protected datetimeToDate(datetime: string | null) {
		if (!datetime) return undefined;
		const date = datetime.split(/[- :]/).map(s => +s);
		return new Date(Date.UTC(date[0], date[1] - 1, date[2], date[3], date[4], date[5]));
	}
}
