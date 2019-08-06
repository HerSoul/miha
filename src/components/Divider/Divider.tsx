import {Component, ComponentInterface, Host, Prop, h} from '@stencil/core';


@Component({
  tag: 'mi-divider',
  styleUrl: 'Divider.scss'
})
export class Divider implements ComponentInterface {

  /**
   * 分割线样式类
   */
  @Prop() classNames: object;

  /**
   * 是否虚线
   */
  @Prop() dashed: boolean = false;

  /**
   * 分割线标题的位置
   */
  @Prop() orientation: 'left' | 'right' | 'center';

  /**
   * 分割线样式对象
   */
  @Prop() styles: object;

  /**
   * 水平还是垂直类型
   */
  @Prop() type: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: { [prop: string]: any };


  render() {
    const {classNames , props, styles, dashed, orientation, type} = this;
    return (
      <Host
        {...props}
        style={{...styles}}
        class={{
          'mi-divider':true,
          'mi-divider-dashed':dashed,
          'mi-divider-with-text':orientation!=undefined,
          [`mi-divider-${orientation}`]:orientation!=undefined,
          [`mi-divider-${type}`]:type!=undefined,
          ...classNames
        }}
      >
        {orientation?<span class="mi-divider-text">
             <slot></slot>
        </span>:''}
      </Host>
  )
  }
}


