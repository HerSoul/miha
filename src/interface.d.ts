import {toMap, toMapPartial} from './utils';
import {tuple ,RowAligns,RowJustify } from './utils/type'
export type Color = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
export type CssClassMap = { [className: string]: boolean };
export type BtnType = 'default' | 'dashed' | 'text' | 'ghost' | 'fill' ;
export type Size = 'small' | 'normal' | 'large'
export type IconTheme = 'filled' | 'outlined' | 'rounded' | 'two-tone'
export type TypographyTheme = 'code' | 'delete' | 'mark' | 'underline' | 'strong' | 'normal'
export type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type BreakpointMap = toMap<BreakPoints,string>;
export type ColAttrsCategory = 'span' | 'pull' | 'push' | 'offset' | 'order';
export type ColAttrs = toMapPartial<BreakPoints,toMapPartial<ColAttrsCategory,number>>;
export type Gutter = toMapPartial<BreakPoints,number>;
export type RowAligns =(typeof RowAligns )[number];
export type RowJustify =(typeof RowJustify )[number] ;
export interface Ellipsis {
  row:number,
  expaned:boolean,
  onExpand?:Function
}
