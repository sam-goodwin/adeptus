import { createTurn, type Turn } from "./turn.js";

export function system<E extends any[]>(
  template: TemplateStringsArray,
  ...expr: E
): Turn<E, "system"> {
  return createTurn("system", template, expr);
}
