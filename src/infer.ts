import { EvalBlock } from "./eval.js";
import { Expr } from "./expr.js";
import { LanguageGenerator } from "./language-generator.js";

type Input = Expr | string | undefined | null | number | boolean;

export declare function infer<E extends Input[]>(
  template: TemplateStringsArray,
  ...expr: E
): LanguageGenerator<EvalBlock<E>>;

export declare function infer<E extends Input[]>(
  ...expr: E
): LanguageGenerator<EvalBlock<E>>;
