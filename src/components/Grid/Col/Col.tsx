import {Component, Prop, h, Element, State, Method, Build} from '@stencil/core';
import { ColAttrs } from '../../../interface'
import {matchBreakpoint} from "../../../utils/styles";

@Component({
  tag: 'mi-col',
  styleUrl: 'col.scss',
})
export class MiCol {
  @Element() el!: HTMLElement;

  @State() _offset:number = 0;
  @State() _pull:number = 0;
  @State() _push:number = 0;
  @State() _span:number = 0;
  /**
   * 栅格左侧的间隔格数，间隔内不可以有栅格
   */
  @Prop() offset: number = 0 ;

  /**
   * 栅格顺序，flex 布局模式下有效
   */
  @Prop() order: string ;

  /**
   * 栅格向左移动格数
   */
  @Prop() pull: number = 0 ;

  /**
   * 栅格向右移动格数
   */
  @Prop() push: number = 0 ;

  /**
   * 栅格占位格数，为 0 时相当于 display: none
   */
  @Prop() span: number;

  /**
   *  响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  @Prop() response: ColAttrs ;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  @Method() async resize(){
    if(Build.isBrowser&&typeof this.response =='object'){
      this.getAttrs();
    }
  }

  @Method() async getAttrs(){
    let _self = this;
    Object.entries(this.response).map(e=>{
      if(matchBreakpoint(e[0])){
        _self._offset=e[1].offset?e[1].offset:this.offset;
        _self._pull=e[1].pull?e[1].pull:this.pull;
        _self._push=e[1].push?e[1].push:this.push;
        _self._span=e[1].span?e[1].span:this.span;
      }
    })
  }

  componentDidLoad(){
    this._span =this.span;
    this._pull =this.pull;
    this._push =this.push;
    this._offset =this.offset;
  }

  render() {
    const { props,order,_offset,_pull,_push,_span } = this;
    return (
        <resize-observer resize={this.resize.bind(this)}>
          <div
            class={{
              'mi-col':true,
              [`mi-col-offset-${_offset}`]:_offset!=undefined,
              [`mi-col-pull-${_pull}`]:_pull!=undefined,
              [`mi-col-push-${_push}`]:_push!=undefined,
              [`mi-col-span-${_span}`]:_span!=undefined
            }}
            style={{
              order:order
            }}
            {...props}
          >
            <div>
             <slot></slot>
            </div>
          </div>
        </resize-observer>
    )
  }

}
