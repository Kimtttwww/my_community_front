import * as yup from "yup";

export class BoardValidSchema {
  static readonly title = yup.string().required('제목이 필요합니다.').max(100, '제목이 너무 깁니다.');
  static readonly content = yup.string().required('내용이 필요합니다.').max(2000, '내용이 너무 깁니다.');
}
