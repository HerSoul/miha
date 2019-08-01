import {
  Component,
  ComponentInterface,
  Prop,
  Host,
  h, Method, Element, Listen,EventEmitter,Event
} from '@stencil/core';
import { Route } from '../type';

/**
 * @slot - 默认内容插槽
 */
@Component({
  tag: 'mi-breadcrumb-item',
  styleUrl:'breadcrumbItem.scss',
  shadow: true
})
export class BreadcrumbItem implements ComponentInterface {

  @Element() el!: HTMLElement;

  @Prop() _separator : string;

  @Event() onClick!: EventEmitter<Route>;

  /**
   * 链接的目的地
   */
  @Prop() href: string ;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: { [prop: string]: any };

  @Listen('click')
  @Method()
  async handelClick(){
    this.onClick.emit();
    if(this.href){
      window.location.href=this.href;
    }
  }

  componentDidUnload() {

  }

  componentDidUpdate() {
  console.log(this._separator);
  }

  render() {
    const { props,_separator } = this;
    return (
      <Host
        {...props}
        class={{
          'mi-breadcrumb-item': true
        }}
      >
        <div class="mi-breadcrumb-item-separator" innerHTML={_separator}></div>
        <div class="mi-breadcrumb-item-content">
          <slot></slot>
        </div>
      </Host>
    )
  }


}


