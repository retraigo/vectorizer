import { BaseVectorizerOptions } from "./base.ts";

export type StandardizeConfig = {
  /** Whether to convert everything to lowercase before fitting / transforming */
  lowercase?: boolean;
  /** Whether to strip HTML tags */
  stripHtml?: boolean;
  /** Whether to replace multiple whitespaces. */
  normalizeWhiteSpaces?: boolean;
};

export type DataType =
  | "u8"
  | "u16"
  | "u32"
  | "u64"
  | "i8"
  | "i16"
  | "i32"
  | "i64"
  | "f32"
  | "f64";

export type TypedArray =
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | BigUint64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | BigInt64Array
  | Float32Array
  | Float64Array;

export type Constructor<T> = new (length: number) => T;

export enum VectorizerMode {
  Count = "count",
  Indices = "indices",
  MultiHot = "multihot",
  TfIdf = "tfidf",
}

export type VectorizerModeConfig = {
  mode: VectorizerMode.Count;
  config?: Partial<BaseVectorizerOptions>;
} | {
  mode: VectorizerMode.Indices;
  config?: Partial<BaseVectorizerOptions & { size: number }>;
} | {
  mode: VectorizerMode.MultiHot;
  config?: Partial<BaseVectorizerOptions>;
} | {
  mode: VectorizerMode.TfIdf;
  config?: Partial<BaseVectorizerOptions & { idf: Float64Array }>;
};