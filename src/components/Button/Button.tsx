import { Component, Prop, h, Host, Listen,Element} from '@stencil/core';
import { BtnType , Size , Color} from '../../interface';
import { hasShadowDom } from "../../utils/utils";

/**
 * @slot - 默认内容插槽
 * @slot start - 开始端内容插槽
 * @slot end - 结束端内容插槽
 */
@Component({
  tag: 'mi-button',
  styleUrl: 'Button.scss',
  shadow: true
})
export class MiButton {
  win:Window;
  @Element() el!: HTMLElement;
  /**
   * 按钮颜色，可选值见 colors
   */
  @Prop() color: Color = 'primary';

  /**
   * 按钮类型
   */
  @Prop() variant: BtnType = 'default';

  /**
   * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
   */
  @Prop() href: string;

  /**
   * 设置 button 原生的 type 值，可选值请参考 HTML 标准
   */
  @Prop() htmlType: string;

  /**
   * 设置按钮载入状态
   */
  @Prop() loading: boolean = false;

  /**
   * 设置按钮形状
   */
  @Prop() shape: 'circle' | 'round';

  /**
   * 设置按钮大小，可选值为 small large 或者不设
   */
  @Prop() size: Size = 'normal';

  /**
   * a 链接的 target 属性，href 存在时生效
   */
  @Prop() target: string;

  /**
   * 是否禁用按钮
   */
  @Prop() disabled: boolean = false;

  /**
   *  将按钮宽度调整为其父宽度
  */
  @Prop() full: boolean = false ;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  /**
   * click 事件
   */
  @Listen('click')
  onClick(ev: Event) {
    if (this.htmlType === 'button') {

    } else if (hasShadowDom(this.el)) {
      const form = this.el.closest('form');
      if (form) {
        ev.preventDefault();
        const fakeButton = this.win.document.createElement('button');
        fakeButton.type = this.htmlType;
        fakeButton.style.display = 'none';
        form.appendChild(fakeButton);
        fakeButton.click();
        fakeButton.remove();
      }
    }
  }

  render() {
    const { props,disabled,loading,size,color,variant,target,href,htmlType,shape,full } = this;

    return (
      <Host
        {...props}
        class={{
           'mi-btn':true,
           'activatable':!disabled&&!loading,
           'mi-btn-disabled':disabled,
           'mi-btn-inloading':loading,
           [`mi-btn-${size}`]:!!size,
           [`mi-color-${color}`]:!!color,
           [`mi-btn-${variant}`]:!!variant,
           [`mi-btn-${shape}`]:!!shape,
           [`mi-btn-full`]:!!full,
        }}
      >
        <div class="loading-overlayer"></div>
        <ripple-effect></ripple-effect>
        <slot name="start"></slot>
        {
         href ?
           <button type={htmlType}>
             <a href={href} target={target}>
             <span><slot></slot></span>
             </a>
           </button>
       :<button type={htmlType}>
           <slot></slot>
         </button>
        }
        <slot name="end"></slot>
      </Host>
    )
  }
}
