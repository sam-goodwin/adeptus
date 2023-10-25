import {
  Client,
  assistant,
  generate,
  match,
  number,
  repeat,
  select,
  string,
} from "../src/index.js";
import { range } from "../src/expr/range.js";
import ts from "typescript";

import dotenv from "dotenv";
import { OpenAIModel } from "../src/models/openai.js";

dotenv.config();

const ai = new Client(
  new OpenAIModel({
    apiKey: process.env.OPENAI_API_KEY!,
  })
);

test("should generate person", async () => {
  const person = await ai.eval(function* () {
    const [name, age, armor, cls, strength, items] = yield* generate`
      The following is a character profile for an RPG game in JSON format.
      \`\`\`json
      {
        "name": "${string}",
        "age": ${range(1, 100)},
        "armor": "${select("leather", "chainmail", "plate")}",
        "class": "${string}",
        "strength": ${match(/[0-9]+/)},
        "items": [
          ${repeat(3)`"${string}",`}
        ]
      }
      \`\`\``;

    return {
      name,
      age,
      armor,
      class: cls,
      strength: Number(strength),
      items,
    };
  });

  expect(person).toMatchObject({
    name: expect.any(String),
    age: expect.any(Number),
    armor: expect.any(String),
    class: expect.any(String),
    strength: expect.any(Number),
    items: expect.any(Array),
  });
  expect(person.items.length).toBe(3);
  for (const item of person.items) {
    expect(typeof item).toEqual("string");
  }
});
