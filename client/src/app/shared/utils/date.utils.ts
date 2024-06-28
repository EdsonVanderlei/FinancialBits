export abstract class DateUtils {
  static handleDateProp = <T>(target: T, prop: keyof T) => {
    const value = target[prop];
    if (typeof value !== 'string' && typeof value !== 'number') return target;
    return {
      ...target,
      [prop]: value !== null && value !== undefined ? new Date(value) : undefined,
    };
  };
  static handleDateProps = <T>(target: T, props: (keyof T)[]) => {
    let result: T | undefined;
    for (const prop of props) result = DateUtils.handleDateProp(target, prop);
    return result ?? target;
  };
}
