import type { Expr } from "../expr/expr.js";
import type { Turn } from "./turn.js";

export type TextGenerator<T> = Generator<Turn<Expr[], any>, T>;
