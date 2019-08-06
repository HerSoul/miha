import {Component, Prop, h, Host, Element, State,Build,Watch} from '@stencil/core';
import { IconTheme } from '../../interface';
import { includeHttp } from '../../utils/utils'
import { getSvgIcon  ,getSvgTel } from './getSvgContent'
@Component({
  tag: 'mi-icon',
  styleUrl: 'Icon.scss',
})
export class MiIcom {
  @Prop({ context: 'window' }) win!: Window;

  @State() content:HTMLElement | string;

  @State() io?: IntersectionObserver;

  @Element() el!: HTMLElement;
  /**
   * Icon 名，支持远程svg icon和自定义svg dom
   */
  @Prop({mutable:true}) icon: string | HTMLElement;

  /**
  * 设置图标的类型
  */
  @Prop() theme: IconTheme = 'filled';

  /**
   * 是否图标进入即将可视化区域后加载
   */
  @Prop() lazy = false;

  /**
   * 设置图标的旋转动画
   */
  @Prop() spinner:boolean;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  connectedCallback() {
    this.waitUntilVisible(this.el, '50px', () => {
      this.getIcon()
    });
  }

  disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void) {
    if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && (window as any).IntersectionObserver) {
      const io = this.io = new (window as any).IntersectionObserver((data: IntersectionObserverEntry[]) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      }, { rootMargin });

      io.observe(el);

    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }
  componentDidLoad(){

  }
  @Watch('icon')
  getIcon(){
    if(typeof this.icon == "object"){
      // 自定义的svg内容
      this.content = this.icon.outerHTML;
    }else{
      if(this.spinner){
        this.icon = this.win['Miha']['_CONFIG'].spinerIcon;
      }
      if(includeHttp(this.icon as string)){
        getSvgIcon(this.icon as string).then(res=>{
          this.content=res;
        })
      }else{
        this.content = getSvgTel(this.icon);
      }
    }
  }
  render() {
    const { icon,theme,props,content ,spinner } = this;
      return (
        <Host
          class={{
            'mi-icon':true,
            'mi-icon-spining':!!spinner
          }}
          {...props}
          icon={icon}
          theme={theme}

        >
          {content
              ? <div class="icon-inner" innerHTML={this.content as string}></div>
              : <div class="icon-inner"></div>
          }
        </Host>
      )
    }

}
