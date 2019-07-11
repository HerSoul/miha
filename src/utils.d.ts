export type Lit = string | number | boolean | undefined | null | void | {};
export type toMap<T extends string,U> = Record<T,U>;
export type toMapPartial<T extends string,U> = Partial<Record<T,U>>
