
import ResizeObserverClass from 'resize-observer-polyfill';
import {Component, ComponentInterface, Prop, h, Element,Host,Watch} from '@stencil/core';
import { debounceRaf } from '../../utils/utils'
@Component({
  tag: 'resize-observer'
})
export class ResizeObserver  implements ComponentInterface {

  @Element() el:HTMLElement;
  resizeObserver: ResizeObserverClass | null = null;

  /**
   *  是否禁用
   */
  @Prop() disabled : boolean =false;

  /**
   *  重新计算元素宽高的回调
   */
  @Prop() resize : Function;

  componentDidLoad() {
    this.onComponentUpdated()
  }

  @Watch('disabled')
  onComponentUpdated() {
    const { disabled } = this;
    const element = this.el.children[0];
    if (!this.resizeObserver && !disabled && element) {
      // Add resize observer
      this.resizeObserver = new ResizeObserverClass(this._onResize);
      this.resizeObserver.observe(element);
    } else if (disabled) {
      // Remove resize observer
      this.destroyObserver();
    }
  }
  destroyObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
   }
   _onResize = () => {
    const { resize } = this;
    if (resize) {
      debounceRaf(resize)
    }
  };

  render(){
    return (
      <Host>
        <slot></slot>
      </Host>
    )

  }
}
