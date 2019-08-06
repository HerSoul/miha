import {Component, ComponentInterface, Element, h, Host, Prop} from '@stencil/core';


@Component({
  tag: 'mi-step',
  styleUrl: 'step.scss'
})
export class Step implements ComponentInterface {

  @Element() el!: HTMLElement;

  /**
   *  步骤的详情描述，可选
   */
  @Prop() description: string|Object;

  /**
   *  步骤图标的类型，可选
   */
  @Prop() icon: string|Object;

  /**
   *  指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：wait process finish error
   */
  @Prop() status: 'wait' | 'process' | 'finish' | 'error' = 'wait';

  /**
   *  标题
   */
  @Prop() titles: string;

  render(){
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
