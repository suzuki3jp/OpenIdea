import * as v from "valibot";

export const postTitleSchema = v.pipe(
  v.string("文字列を入力してください"),
  v.minLength(5, "5文字以上で入力してください"),
  v.maxLength(20, "20字以内で入力してください"),
  v.nonEmpty("このフィールドは必須です"),
);
export const postFreeContentSchema = v.pipe(
  v.string("文字列を入力してください"),
  v.minLength(5, "5文字以上で入力してください"),
  v.maxLength(500, "500字以内で入力してください"),
  v.nonEmpty("このフィールドは必須です"),
);
export const postPaidContentSchema = v.pipe(
  v.string("文字列を入力してください"),
  v.maxLength(500, "500字以内で入力してください"),
);

export const postSchema = v.object({
  title: postTitleSchema,
  freeContent: postFreeContentSchema,
  paidContent: postPaidContentSchema,
});
