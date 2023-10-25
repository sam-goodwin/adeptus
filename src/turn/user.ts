import type { Expr } from "../expr/expr.js";
import { createTurn, type Turn } from "./turn.js";

export function user<E extends Expr[]>(
  template: TemplateStringsArray,
  ...expr: E
): Turn<E, "user"> {
  return createTurn("user", template, expr);
}
