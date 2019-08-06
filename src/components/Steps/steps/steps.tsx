import {Component, ComponentInterface, Element, h, Host, Prop} from '@stencil/core';


@Component({
  tag: 'mi-steps',
  styleUrl: 'steps.scss'
})
export class Steps implements ComponentInterface {

  @Element() el!: HTMLElement;

  /**
   *  步骤条类名
   */
  @Prop() classNames: string;

  /**
   *  指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态
   */
  @Prop() current: number = 0;

  /**
   *  指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向
   */
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   *  指定标签放置位置，默认水平放图标右侧，可选 vertical 放图标下方
   */
  @Prop() labelPlacement: 'horizontal' | 'vertical' = 'horizontal';

  /**
   *  点状步骤条，可以设置为一个 function，labelPlacement 将强制为 vertical
   */
  @Prop() progressDot: Boolean | Function = false;

  /**
   *  指定大小，目前支持普通（default）和迷你（small)
   */
  @Prop() size: 'default' | 'small' = 'default';

  /**
   *  指定当前步骤的状态，可选 wait process finish error
   */
  @Prop() status: 'wait' | 'process' | 'finish' | 'error' = 'process';

  /**
   *  起始序号，从 0 开始记数
   */
  @Prop() initial: number = 0;

  /**
   *  点击切换步骤时触发
   */
  @Prop() onChanges: (number)=>void = ()=>{};

  render(){
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
