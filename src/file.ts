import { errAsync, okAsync, ResultAsync } from "neverthrow";

/**
 * Get a file object from a URL
 *
 * @param url The URL to fetch
 * @returns result of File or string
 */
export function get_file_from_url(
  url: string | URL,
): ResultAsync<File, string> {
  return ResultAsync.fromPromise(
    fetch(url),
    (err) =>
      `Failed to fetch URL: ${
        err instanceof Error ? err.message : String(err)
      }`,
  ).andThen(
    (res) => {
      if (res.ok !== true) {
        return errAsync(`HTTP Error: ${res.status} ${res.statusText}`);
      }
      return okAsync(res);
    },
  ).andThen((response) =>
    ResultAsync.fromPromise(
      response.blob(),
      (err) =>
        `Failed to read response as Blob: ${
          err instanceof Error ? err.message : String(err)
        }`,
    ).map((blob) => ({ response, blob }))
  ).map(({ response, blob }) => {
    const contentDisposition = response.headers.get("content-disposition");
    const name = (contentDisposition &&
      extract_name_from_content_disposition(contentDisposition)) ?? "unnamed";

    const type = response.headers.get("content-type") ??
      "application/octet-stream";
    return new File([blob], name, { type });
  });
}

function extract_name_from_content_disposition(
  content_disposition: string,
): string | null {
  const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
    content_disposition,
  );
  if (match != null) {
    return match[1].replace(/['"]/g, "").trim();
  }
  return null;
}

/**
 * Get the base64 of a File
 *
 * @param The file to read
 * @returns result a base64, error
 */
export function read_b64_of_file(file: File): ResultAsync<string, string> {
  return ResultAsync.fromPromise(
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject(new Error(`Failed to read file: ${file.name}`));
      reader.readAsDataURL(file);
    }),
    (error) => error instanceof Error ? error.message : String(error),
  );
}
