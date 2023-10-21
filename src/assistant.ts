import type { Eval } from "./eval.js";
import type { Expr } from "./expr.js";
import type { LanguageGenerator } from "./language-generator.js";
import { createTurn } from "./turn.js";

export function* assistant<E extends Expr[]>(
  template: TemplateStringsArray,
  ...expr: E
): LanguageGenerator<Eval<E>> {
  return (yield createTurn("assistant", template, expr)) as Eval<E>;
}
