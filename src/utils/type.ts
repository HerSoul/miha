import {Lit} from "../utils";
export const tuple = <T extends Lit[]>(...args: T) => args;


// cosnt
export const RowAligns = tuple('start', 'center', 'end');
export const RowJustify = tuple('start', 'end', 'center', 'around', 'between');
