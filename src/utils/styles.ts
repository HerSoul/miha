import { Color, CssClassMap,BreakpointMap } from '../interface';

export const SIZE_TO_MEDIA: BreakpointMap = {
  'xs': '(min-width: 0px)',
  'sm': '(min-width: 576px)',
  'md': '(min-width: 768px)',
  'lg': '(min-width: 992px)',
  'xl': '(min-width: 1200px)',
  'xxl':'(min-width: 1600px)'
};

// Check if the window matches the media query
// at the breakpoint passed
// e.g. matchBreakpoint('sm') => true if screen width exceeds 576px
export function matchBreakpoint( breakpoint: string | undefined) {
  const win=window;
  if (breakpoint === undefined || breakpoint === '') {
    return true;
  }
  if ((win as any).matchMedia) {
    const mediaQuery = SIZE_TO_MEDIA[breakpoint];
    return win.matchMedia(mediaQuery).matches;
  }
  return false;
}


export function hostContext(selector: string, el: HTMLElement): boolean {
  return el.closest(selector) !== null;
}

/**
 * Create the mode and color classes for the component based on the classes passed in
 */
export function createColorClasses(color: Color | undefined | null): CssClassMap | undefined {
  return (typeof color === 'string' && color.length > 0) ? {
    [`mi-color-${color}`]: true
  } : undefined;
}

export function getClassList(classes: string | (string | null | undefined)[] | undefined): string[] {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ');
    return array
      .filter(c => c != null)
      .map(c => (c as string).trim())
      .filter(c => c !== '');
  }
  return [];
}

export function getClassMap(classes: string | string[] | undefined): CssClassMap {
  const map: CssClassMap = {};
  getClassList(classes).forEach(c => map[c] = true);
  return map;
}

export function addStyles(el:any,styles:object,sub?:string) {
      var dom:HTMLElement = el;
      if(sub){
        dom =  el.querySelector(sub);
      };
      Object.entries(styles).map(style=>{
        dom.style[style[0]] = style[1];
      })
}

export function isStyleSupport(styleName: string | Array<string>): boolean {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    const { documentElement } = window.document;

    return styleNameList.some(name => name in documentElement.style);
  }
  return false;
}

export function pxToNumber(value: string | null): number {
  if (!value) return 0;

  const match = value.match(/^\d*(\.\d*)?/);

  return match ? Number(match[0]) : 0;
}

export function styleToString(style: CSSStyleDeclaration) {
  const styleNames: string[] = Array.prototype.slice.apply(style);
  return styleNames.map(name => `${name}: ${style.getPropertyValue(name)};`).join('');
}

export function elementToString(who:HTMLElement, deep:boolean):string {
    let txt, ax, el= document.createElement("div");
    el.appendChild(who.cloneNode(false));
    txt= el.innerHTML;
    if(deep){
      ax= txt.indexOf('>')+1;
      txt= txt.substring(0, ax)+who.innerHTML+ txt.substring(ax);
    }
    el= null;
    return txt;
}
export function findChildEls(el:HTMLElement,selector:string) {
  let childrens = el.querySelectorAll(selector);
  if(childrens&&childrens.length>0){
    return childrens
  }else{
    return []
  }
}

