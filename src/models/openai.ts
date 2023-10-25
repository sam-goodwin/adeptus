import {
  Completion,
  LogitBias,
  Model,
  ModelOptions,
  NextRequest,
} from "./model.js";
import { OpenAI, ClientOptions } from "openai";

export interface OpenAIModelOptions extends ClientOptions {}

export class OpenAIModel extends Model {
  private readonly openAI;
  constructor(options: OpenAIModelOptions) {
    super({
      // see: https://github.com/dqbd/tiktoken/issues/73
      encoding: "cl100k_base",
    });
    this.openAI = new OpenAI(options);
  }

  public async next(options: NextRequest): Promise<AsyncIterable<Completion>> {
    return this.openAI.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: options.prompt,
      stream: true,
      stop: options.stop ? [options.stop].flat() : undefined,
      // TODO: add support for customizing these options
      n: 1,
      temperature: 0,
      max_tokens: 100,
      logit_bias: Object.entries(options.bias ?? {}).reduce<LogitBias>(
        (logit, [key, value]) => ({
          ...logit,
          ...Object.fromEntries(
            this.tokenizer
              .encode(key)
              .map((token) => [
                token,
                logit[token] ? Math.max(logit[token], value) : value,
              ])
          ),
        }),
        {}
      ),
    });
  }
}
