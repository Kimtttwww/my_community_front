import { FieldErrors } from "react-hook-form";
import { FormInputsErrorMessages } from "../model/shareTypes";

export function extractMessagesToFieldError<T extends Record<keyof FormInputsErrorMessages, any>>(errors: FieldErrors<T>): FormInputsErrorMessages {
  const result = {} as Record<keyof T, string>;

  for (const key in errors) {
    result[key as keyof T] = String(errors[key]?.message ?? '');
  }

  return result;
}
