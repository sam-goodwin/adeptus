import { getEncoding, type Tiktoken, type TiktokenEncoding } from "js-tiktoken";
import type { OpenAI } from "openai";
import type { Expr } from "../expr/expr.js";
import { isRangeSlot } from "../expr/range.js";
import { isSelectSlot } from "../expr/select.js";

/**
 * Bias the generation of text.
 *
 * This is pre-tokenization - tokenization of the text will be performed by the
 * target model's tokenizer.
 */
export type TextLogitBias = {
  [text: string]: number;
};

export interface NextRequest {
  prompt: string;
  stop?: string | string[];
  n: 1;
  temperature: 0;
  max_tokens: 100;
  bias?: TextLogitBias;
}

export type Completion = OpenAI.Completions.Completion;

export interface IModel {
  next(options: NextRequest): Promise<AsyncIterable<Completion>>;
}

export type LogitBias = {
  [token: number]: number;
};

export interface ModelOptions {
  encoding: TiktokenEncoding;
}

export abstract class Model implements IModel {
  readonly tokenizer: Tiktoken;
  constructor(readonly options: ModelOptions) {
    this.tokenizer = getEncoding(options.encoding);
  }

  public abstract next(
    options: NextRequest
  ): Promise<AsyncIterable<Completion>>;

  protected computeBias(slot: Expr): LogitBias | undefined {
    if (isSelectSlot(slot)) {
      return Object.fromEntries(
        slot.options.items.flatMap((item) =>
          this.tokenizer.encode(item).map((e) => [e, 100])
        )
      );
    } else if (isRangeSlot(slot)) {
      const length = slot.options.to - slot.options.from;
      if (length > 1_000) {
        console.warn(`Range is too large: ${length}`);
        return undefined;
      }
      const bias: LogitBias = {};
      for (let i = slot.options.from; i <= slot.options.to; i++) {
        bias[this.tokenizer.encode(i.toString())[0]] = 1;
      }
      return bias;
    }
    return undefined;
  }
}
