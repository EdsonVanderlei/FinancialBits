export abstract class DateUtils {
	static resetHours = (date: Date) => new Date(`${date.toISOString().split('T')[0]}T00:00:00`);
	static resetStrHours = (date: string) => DateUtils.resetHours(new Date(date));
}
