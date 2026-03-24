import { ResultAsync } from "neverthrow";
import { GenericSchema, type InferOutput, parse } from "valibot";

type ApiResult<T> = ResultAsync<T, string>;

export function safe_request<T>(callback: Promise<T>): ApiResult<T> {
  return ResultAsync.fromPromise(callback, (e) => String(e));
}

export function request_json<TSchema extends GenericSchema>(
  request: Promise<unknown>,
  schema: TSchema,
): ApiResult<InferOutput<TSchema>> {
  return safe_request(request.then((data) => parse(schema, data)));
}
