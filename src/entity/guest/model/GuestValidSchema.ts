import * as yup from "yup";

export class GuestValidSchema {
	static readonly ID = yup.string().required('아무 값도 없습니다.');
	static readonly PWD = yup.string().required('아무 값도 없습니다.').min(6, '길이가 너무 짧습니다.').max(60, '길이가 너무 깁니다.');
	static readonly NAME = yup.string().required('아무 값도 없습니다.').max(15, '길이가 너무 깁니다.');
}
