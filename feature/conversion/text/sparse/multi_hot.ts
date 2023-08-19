import { BaseVectorizer } from "../base.ts";
import { Matrix } from "../../../../utils/matrix.ts";

import type { BaseVectorizerOptions } from "../base.ts";
import { DataType, TypedArray } from "../types.ts";
import { getConstructor } from "../../../../utils/get_constructor.ts";

/**
 * Convert text into vectors (bag of words)
 */
export class MultiHotVectorizer extends BaseVectorizer {
  constructor(options: Partial<BaseVectorizerOptions> = {}) {
    super(options);
  }
  /**
   * Convert a document (string | array of strings) into vectors.
   */
  transform<T extends TypedArray>(
    text: string | string[],
    dType: DataType,
  ): Matrix<T> {
    if (!this.vocabulary.size) {
      throw new Error(
        "MultiHotVectorizer vocabulary not initialized yet. Call `new MultiHotVectorizer()` with a custom vocabulary or use `.fit()` on an array of text.",
      );
    }
    if (Array.isArray(text)) {
      const res = new Matrix(
        new (getConstructor(dType))(text.length * this.vocabulary.size),
        [text.length, this.vocabulary.size],
      );
      let i = 0;
      while (i < text.length) {
        res.setRow(i, this.#transform<T>(text[i], dType));
        i += 1;
      }
      return res as Matrix<T>;
    } else {
      return new Matrix(this.#transform<T>(text, dType), [1, this.vocabulary.size]);
    }
  }
  #transform<T>(text: string, dType: DataType): T {
    text = this.preprocess(text);
    const res = new (getConstructor(dType))(this.vocabulary.size);
    const words = this.split(text);
    let i = 0;
    while (i < words.length) {
      if (this.vocabulary.has(words[i])) {
        const index = this.vocabulary.get(words[i]);
        if (typeof index === "number") {
          // @ts-ignore No error here
          res[index] = typeof res[index] === "bigint" ? 1n : 1;
        }
      }
      i += 1;
    }
    return res as T;
  }
}