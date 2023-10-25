import { jest } from "@jest/globals";
import {
  Client,
  assistant,
  generate,
  match,
  number,
  repeat,
  select,
  string,
  range,
} from "../src/index.js";

import dotenv from "dotenv";
import { iterate } from "../src/expr/zero-or-many.js";
import { OpenAIModel } from "../src/models/openai.js";

jest.setTimeout(120_000);

dotenv.config();

const openai = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY!,
  timeout: 120_000,
});
const ai = new Client(openai);

const identifier = match(/[a-z_][a-z0-9_]*/i);

test("should generate person", async () => {
  const person = await ai.eval(function* () {
    const [modifier, id] = yield* generate`
      // Implement a function that computes the prime numbers of 'n':
      ${select("function", "const", "let")} ${identifier}`;

    if (modifier === "function") {
      const FunctionArgs = iterate`${string}:${string},`.stop(")");

      const [args] = yield* generate`(${FunctionArgs})`;

      return {
        modifier,
        name,
        args,
      };
    }

    return id;
  });
});
