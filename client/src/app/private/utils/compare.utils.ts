export const compare = {
  truthyNumber: (value: any) =>
    !!value && value !== null && typeof value !== 'undefined',

  truthyArray: (value: any) =>
    Array.isArray(value) && value !== null && typeof value !== 'undefined',

  truthyDate: (value: any) => value instanceof Date,

  equalObjects: (obj1: any, obj2: any) => {
    if (
      typeof obj1 !== 'object' ||
      typeof obj2 !== 'object' ||
      obj1 === null ||
      obj2 === null
    )
      return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = typeof val1 === 'object' && typeof val2 === 'object';

      if (
        (areObjects && !compare.equalObjects(val1, val2)) ||
        (!areObjects && val1 !== val2)
      )
        return false;
    }

    return true;
  },
};
