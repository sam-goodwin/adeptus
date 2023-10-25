import type { Literal } from "./literal.js";
import type { MatchSlot } from "./match.js";
import type { NumberSlot } from "./number.js";
import type { RangeSlot } from "./range.js";
import type { RepeatSlot } from "./repeat.js";
import type { Select } from "./select.js";
import type { StringSlot } from "./string.js";
import { ZeroOrManySlot } from "./zero-or-many.js";

export const Kind = Symbol.for("Kind");

export type Expr =
  | Literal<any>
  | MatchSlot
  | NumberSlot
  | RangeSlot
  | RepeatSlot<any>
  | Select<string>
  | StringSlot
  | ZeroOrManySlot<any>;
