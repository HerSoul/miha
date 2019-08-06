import {
  Component,
  ComponentInterface,
  Prop,
  Host,
  Element,
  h,
  State,
  EventEmitter,
  Event,
  Watch
} from '@stencil/core';
import { throttleByAnimationFrameDecorator } from '../../utils/decorators/throttleByAnimationFrame';
import {
  addObserveTarget,
  removeObserveTarget,
  getTargetRect,
  getFixedTop,
  getFixedBottom,
} from './utils';


/**
 * @slot - 默认内容插槽
 */
@Component({
  tag: 'mi-affix',
  styleUrl:'affix.scss',
  shadow:true
})
export class Affix implements ComponentInterface {

  // 状态变化时触发
  @Event() change!: EventEmitter<boolean>;

  @State() isAffix:boolean;

  @State() timeout:number;

  @State() prevTarget:HTMLElement|Window;

  @State() placeholderNode:HTMLElement;

  @State() fixedNode:HTMLElement;

  @State() affixStyle:{[key: string]: string};

  @Element() el:HTMLElement;

  /**
   * 距离窗口底部达到指定偏移量
   */
  @Prop() bottom: number;


  /**
   * 距离窗口顶部达到指定偏移量
   */
  @Prop() top: number;

  /**
   * 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数
   */
  @Prop() target: ()=>HTMLElement|Window = ()=>window;


  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;


  @Watch('isAffix')
  onChange(newValue: boolean) {
    this.change.emit(newValue);
  }

  componentDidLoad(){
    const { target } = this;
    if (target) {
      this.prevTarget = this.target();
      this.timeout = setTimeout(() => {
        addObserveTarget(target(), this);
        this.measure();
      });
    }
  }
  componentDidUnload(){
    clearTimeout(this.timeout);
    removeObserveTarget(this);
    (this.lazyUpdatePosition() as any).cancel();
  }
  componentDidUpdate(){
    const { prevTarget } = this;
    const { target } = this;
    let newTarget = null;
    if (target) {
      newTarget = target() || null;
    }
    if (prevTarget !== newTarget) {
      removeObserveTarget(this);
      if (newTarget) {
        addObserveTarget(newTarget, this);
        // Mock Event object.
        this.lazyUpdatePosition();
      }
      this.prevTarget=newTarget;
    }
  }
  savePlaceholderNode = (node: HTMLDivElement) => {
    this.placeholderNode = node;
  };

  saveFixedNode = (node: HTMLDivElement) => {
    this.fixedNode = node;
  };

  getOffsetTop = () => {
    let { top,bottom } = this;
    if (bottom === undefined && top === undefined) {
      top = 0;
    }
    return top;
  };
  getOffsetBottom = () => {
    return this.bottom;
  };

  @throttleByAnimationFrameDecorator()
  lazyUpdatePosition() {
    this.measure()
  }

  updatePosition() {
    this.measure()
  }

  measure = () => {
    const offsetTop = this.getOffsetTop();
    const offsetBottom = this.getOffsetBottom();
    const targetNode = this.target();
    if (!targetNode) {
      return;
    }
    const targetRect = getTargetRect(targetNode);
    const placeholderReact = getTargetRect(this.placeholderNode);
    const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
    const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);
    if (fixedTop !== undefined) {
      this.isAffix=true;
      this.affixStyle = {
        position: 'fixed',
        top: fixedTop+'px'
      };
    } else if (fixedBottom !== undefined) {
      this.isAffix=true;
      this.affixStyle = {
        position: 'fixed',
        bottom: fixedBottom+'px'
      };
    }else{
      this.isAffix=false;
      this.affixStyle = {
        position: 'relative'
      };
    }

  };

  render(){
    const { props } = this;
    return (
      <Host
      {...props}
      class={{
        'mi-affix':true
      }}
      >
        <div ref={this.savePlaceholderNode}>
          <div ref={this.saveFixedNode} style={this.affixStyle}>
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }



}


