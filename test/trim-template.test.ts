import { select, string } from "../src/index.js";
import { trimTemplate } from "../src/util/trim-template.js";

function t(template: TemplateStringsArray, ...args: any[]) {
  return trimTemplate(template);
}

test("should trim indentations", () => {
  expect(t`
    hello
      world`).toEqual([`hello\n  world`]);

  expect(t`
    hello
    ${""}world`).toEqual(["hello\n", "world"]);

  expect(t`
    hello
    ${""}  world`).toEqual(["hello\n", "  world"]);

  expect(t`
    hello
    ${""}
      world`).toEqual(["hello\n", "\n  world"]);

  expect(t`
    hello
    world`).toEqual([`hello\nworld`]);

  expect(t`
    hello
  world`).toEqual([`hello\nworld`]);
});

test("should not trim spaces in between substitutions", () => {
  expect(t`
    // Implement a function that computes the prime numbers of 'n':
    ${select("function", "const", "let")} ${string}`).toEqual([
    "// Implement a function that computes the prime numbers of 'n':\n",
    " ",
    "",
  ]);
});
