import * as v from "valibot";

export const tagNameSchema = v.pipe(
  v.string("文字列を入力してください"),
  v.minLength(2, "2文字以上で入力してください"),
  v.maxLength(15, "15字以内で入力してください"),
);
