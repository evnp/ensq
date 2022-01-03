export declare type ENSQ<NameEnum, ElementEnum, ConditionalEnum> = {
  elm: ENSQElm;
} & {
  [key in keyof NameEnum]: ENSQ<NameEnum, ElementEnum, ConditionalEnum>;
} & {
  [key in keyof ElementEnum]: ENSQConditionals<ConditionalEnum>;
} & ENSQConditionals<ConditionalEnum>;
export declare type ENSQConditionals<ConditionalEnum> = {
  elm: ENSQElm;
} & {
  [key in keyof ConditionalEnum]: ENSQConditionals<ConditionalEnum>;
};
export declare type ENSQElm = ENSQFunc<HTMLElement | null> & {
  num: ENSQFunc<number>;
  all: ENSQFunc<HTMLElement[]>;
  until: ENSQAsyncFunc<HTMLElement | null> & {
    num: ENSQAsyncFunc<number>;
    all: ENSQAsyncFunc<HTMLElement[]>;
  };
  text: string;
  html: string;
  print: (options: {
    log: boolean;
    color: boolean;
    indent: string | null;
  }) => void;
};
export declare type ENSQFunc<T> = (
  idxOrCondition?: number | ((arg: ENSQElm) => unknown)
) => T;
export declare type ENSQAsyncFunc<T> = (
  idxOrCondition?: number | ((arg: ENSQElm) => unknown)
) => Promise<T>;
export declare type ENSQBuilder<NameEnum, ElementEnum, ConditionalEnum> = (
  html: string | HTMLElement
) => ENSQ<NameEnum, ElementEnum, ConditionalEnum>;
export declare type ENSQConfig = {
  elementSeparator: string;
  conditionalSeparator: string;
};
declare function ensq<NameEnum = "", ElementEnum = "", ConditionalEnum = "">(
  nameEnum: Record<keyof NameEnum, string | number>,
  elementEnum?: Record<keyof ElementEnum, string | number>,
  conditionalEnum?: Record<keyof ConditionalEnum, string | number>
): ENSQBuilder<NameEnum, ElementEnum, ConditionalEnum>;
declare namespace ensq {
  var configure: (configUpdate: Partial<ENSQConfig>) => void;
}
export default ensq;
