export abstract class StorageUtils {
  static set(key: string, value: any, stringify: boolean = true) {
    localStorage.setItem(key, stringify ? JSON.stringify(value) : value);
  }

  static get<T>(key: string, parse: boolean = true) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    if (!parse) return value as T;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  static remove<T>(key: string) {
    localStorage.removeItem(key);
  }
}
