import { maxLength, minLength, pipe, string, uuid } from "valibot";

export const uuidSchema = pipe(
  string(),
  uuid(),
);

export const customStringSchema = (min: number, max: number) =>
  pipe(
    string(),
    minLength(min),
    maxLength(max),
  );

export const SmallStringSchema = customStringSchema(1, 255);
