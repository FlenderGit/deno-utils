interface BaseSchema {
  readonly title?: string;
  readonly description?: string;
  readonly const?: unknown;
  readonly anyOf?: readonly JSONSchema[];
  readonly oneOf?: readonly JSONSchema[];
  readonly allOf?: readonly JSONSchema[];
}

interface SchemaObject extends BaseSchema {
  readonly type: "object";
  readonly properties?: { readonly [key: string]: JSONSchema };
  readonly required?: readonly string[];
  readonly additionalProperties?: boolean | JSONSchema;
  readonly examples?: readonly Record<string, unknown>[];
}

interface SchemaString extends BaseSchema {
  readonly type: "string";
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string;
  readonly format?:
    | "date-time"
    | "time"
    | "date"
    | "duration"
    | "email"
    | "hostname"
    | "ipv4"
    | "ipv6"
    | "uuid";
  readonly enum?: readonly string[];
  readonly examples?: readonly string[];
}

interface SchemaNumber extends BaseSchema {
  readonly type: "number" | "integer";
  readonly minimum?: number;
  readonly maximum?: number;
  readonly multipleOf?: number;
  readonly enum?: readonly number[];
  readonly examples?: readonly number[];
}

interface SchemaBoolean extends BaseSchema {
  readonly type: "boolean";
  readonly enum?: readonly boolean[];
  readonly examples?: readonly boolean[];
}

interface SchemaArray extends BaseSchema {
  readonly type: "array";
  readonly items?: JSONSchema;
  readonly minItems?: number;
  readonly maxItems?: number;
  readonly examples?: readonly unknown[];
}

interface SchemaNull extends BaseSchema {
  readonly type: "null";
  readonly examples?: readonly null[];
}

export type JSONSchema =
  | SchemaObject
  | SchemaString
  | SchemaNumber
  | SchemaBoolean
  | SchemaArray
  | SchemaNull;

export type FromSchema<T> = T extends
  { type: "object"; properties: infer Props }
  ? { [K in keyof Props]: ExtractType<Props[K]> }
  : never;

type ExtractType<T> = T extends { type: "string" } ? string
  : T extends { type: "number" } ? number
  : T extends { type: "boolean" } ? boolean
  : T extends { type: "array"; items: infer Items } ? Array<ExtractType<Items>>
  : T extends { type: "object"; properties: any } ? FromSchema<T>
  : unknown;
