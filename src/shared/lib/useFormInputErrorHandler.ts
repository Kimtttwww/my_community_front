import { useState } from "react";
import { FieldErrors } from "react-hook-form";

type FormInputsErrorMessages = { [K: string]: string };

export default function useFormInputErrorHandler() {
	const [validState, setValidState] = useState<FormInputsErrorMessages>({});
	
	function handleDefaultInvalid<T extends Record<string, any>>(errors: FieldErrors<T>) {
		setValidState(extractMessagesToFieldError(errors));
	}
	
	function extractMessagesToFieldError<T extends Record<keyof FormInputsErrorMessages, any>>(errors: FieldErrors<T>): FormInputsErrorMessages {
		const result = {} as Record<keyof T, string>;
	
		for (const key in errors) {
			result[key as keyof T] = String(errors[key]?.message ?? '');
		}
	
		return result;
	}

	return { extractMessagesToFieldError, handleDefaultInvalid, setValidState, validState };
}
