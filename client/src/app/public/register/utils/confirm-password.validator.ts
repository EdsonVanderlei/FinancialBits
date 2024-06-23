import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export const confirmPasswordValidator =
  (compareFormControlName: string): ValidatorFn =>
  (formControl: AbstractControl): ValidationErrors | null => {
    if (formControl.untouched) return null;

    const compareValue = formControl.parent?.get(compareFormControlName)?.value;
    if (!compareValue) return null;

    const equalValue = formControl.value === compareValue;
    if (equalValue) return null;

    return { confirmPassword: true };
  };
