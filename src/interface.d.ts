export type Color = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
export type CssClassMap = { [className: string]: boolean };
export type BtnType = 'default' | 'dashed' | 'text' | 'ghost' | 'fill' ;
export type Size = 'small' | 'normal' | 'large'
export type IconTheme = 'filled' | 'outlined' | 'rounded' | 'two-tone'
export type TypographyTheme = 'code' | 'delete' | 'mark' | 'underline' | 'strong' | 'normal'

export interface Ellipsis {
  row:number,
  expaned:boolean,
  onExpand?:Function
}
