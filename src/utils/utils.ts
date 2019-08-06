import { EventEmitter } from '@stencil/core';
export function rIC(callback: () => void) {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback);
  } else {
    setTimeout(callback, 32);
  }
}

export function hasShadowDom(el: HTMLElement) {
  return !!el.shadowRoot && !!(el as any).attachShadow;
}

export function clamp(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
export function assert(actual: any, reason: string) {
  if (!actual) {
    const message = 'ASSERT: ' + reason;
    console.error(message);
    debugger; // tslint:disable-line
    throw new Error(message);
  }
}

export function now(ev: UIEvent) {
  return ev.timeStamp || Date.now();
}

export function pointerCoord(ev: any): {x: number, y: number} {
  // get X coordinates for either a mouse click
  // or a touch depending on the given event
  if (ev) {
    const changedTouches = ev.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    if (ev.pageX !== undefined) {
      return { x: ev.pageX, y: ev.pageY };
    }
  }
  return { x: 0, y: 0 };
}

export function debounceEvent(event: EventEmitter, wait: number): EventEmitter {
  const original = (event as any)._original || event;
  return {
    _original: event,
    emit: debounce(original.emit.bind(original), wait)
  } as EventEmitter;
}
export function debounceRaf(cb) {
  let rafId;
  const raf = window.requestAnimationFrame,
        caf = window.cancelAnimationFrame;
  if(raf){
    caf(rafId);
    rafId=raf(cb)
  }else{
    debounce(cb,16)
  }
}
export function debounce(func: (...args: any[]) => void, wait = 0) {
  let timer: any;
  return (...args: any[]): any => {
    clearTimeout(timer);
    timer = setTimeout(func, wait, ...args);
  };
}
export function getParentNodeAttr(el:HTMLElement,attr:string):any {
   if(!el||!attr)return;
   return el.parentElement.getAttribute(attr);
}
export function includeHttp(str:string):boolean {
  return str.includes('http');
}
export function addEventListener(target:HTMLElement,eventName:string,listener:EventListenerOrEventListenerObject,options?:Object) {
  return target.addEventListener(eventName,listener,options)
}
export function getCapitalUpLower(type:'lower'|'upper'='upper',letter:string) {
  let letterArr = letter.split(' ');
  if(letterArr.length>0){
    type=='upper'?letterArr[0]=letterArr[0].toLocaleUpperCase():letterArr[0]=letterArr[0].toLocaleLowerCase()
  }
  return letterArr.join('');
}
