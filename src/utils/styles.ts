import { Color, CssClassMap } from '../interface';

export const SIZE_TO_MEDIA: any = {
  'xs': '(min-width: 0px)',
  'sm': '(min-width: 576px)',
  'md': '(min-width: 768px)',
  'lg': '(min-width: 992px)',
  'xl': '(min-width: 1200px)',
};

// Check if the window matches the media query
// at the breakpoint passed
// e.g. matchBreakpoint('sm') => true if screen width exceeds 576px
export function matchBreakpoint(win: Window, breakpoint: string | undefined) {
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
