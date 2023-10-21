import type { Expr } from "./expr.js";
import type { Turn } from "./turn.js";

export type LanguageGenerator<T> = Generator<Turn<Expr[], any>, T>;
