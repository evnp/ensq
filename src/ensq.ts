export type ENSQ<NameEnum, ElementEnum, ConditionalEnum> = {
  elm: ENSQElm;
} & {
  [key in keyof NameEnum]: ENSQ<NameEnum, ElementEnum, ConditionalEnum>;
} & {
  [key in keyof ElementEnum]: ENSQConditionals<ConditionalEnum>;
} & ENSQConditionals<ConditionalEnum>;

export type ENSQConditionals<ConditionalEnum> = {
  elm: ENSQElm;
} & {
  [key in keyof ConditionalEnum]: ENSQConditionals<ConditionalEnum>;
};

export type ENSQElm = ENSQFunc<HTMLElement | null> & {
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

export type ENSQFunc<T> = (
  idxOrCondition?: number | ((arg: ENSQElm) => unknown)
) => T;

export type ENSQAsyncFunc<T> = (
  idxOrCondition?: number | ((arg: ENSQElm) => unknown)
) => Promise<T>;

export type ENSQBuilder<NameEnum, ElementEnum, ConditionalEnum> = (
  html: string | HTMLElement
) => ENSQ<NameEnum, ElementEnum, ConditionalEnum>;

export type ENSQConfig = {
  elementSeparator: string;
  conditionalSeparator: string;
};

const config: ENSQConfig = {
  elementSeparator: "-",
  conditionalSeparator: "--",
};

export default function ensq<
  NameEnum = "",
  ElementEnum = "",
  ConditionalEnum = ""
>(
  nameEnum: Record<keyof NameEnum, string | number>,
  elementEnum?: Record<keyof ElementEnum, string | number>,
  conditionalEnum?: Record<keyof ConditionalEnum, string | number>
): ENSQBuilder<NameEnum, ElementEnum, ConditionalEnum> {
  return (() => ({
    nameEnum,
    elementEnum,
    conditionalEnum,
  })) as unknown as ENSQBuilder<NameEnum, ElementEnum, ConditionalEnum>;
}

ensq.configure = function (configUpdate: Partial<ENSQConfig>) {
  Object.assign(config, configUpdate);
};
