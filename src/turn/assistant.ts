import type { Eval } from "../eval.js";
import type { Expr } from "../expr/expr.js";
import type { TextGenerator } from "./text-generator.js";
import { createTurn } from "./turn.js";

export const generate = assistant;

export function* assistant<E extends Expr[]>(
  template: TemplateStringsArray,
  ...expr: E
): TextGenerator<Eval<E>> {
  return (yield createTurn("assistant", template, expr)) as Eval<E>;
}
