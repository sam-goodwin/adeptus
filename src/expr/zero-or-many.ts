import { type Expr } from "./expr.js";
import { Slot, SlotOptions, isSlot } from "./slot.js";

export function isZeroOrMany(expr: Expr): expr is ZeroOrManySlot<Expr[]> {
  return isSlot(expr) && expr.type === "zero-or-many";
}

export interface ZeroOrManyOptions<E extends Expr[]> extends SlotOptions {
  template: string[];
  exprs: E;
}

export class ZeroOrManySlot<E extends Expr[]> extends Slot<"zero-or-many"> {
  constructor(readonly options: ZeroOrManyOptions<E>) {
    super("zero-or-many", options);
  }
}

export function iterate<E extends Expr[]>(
  template: TemplateStringsArray,
  ...exprs: E
) {
  return new ZeroOrManySlot({
    template: [...template.raw],
    exprs,
  });
}
