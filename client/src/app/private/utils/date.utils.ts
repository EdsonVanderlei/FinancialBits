export abstract class DateUtils {
  static monthRange(min: Date) {
    const max = new Date(
      min.getFullYear(),
      min.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );
    return { min, max };
  }
  static nowMoth() {
    const date = DateUtils.now();
    date.setDate(1);
    return date;
  }
  static now() {
    return DateUtils.resetHours(new Date());
  }
  static resetHours(date: Date) {
    date.setHours(0, 0, 0, 0);
    return date;
  }
  static formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }
}
