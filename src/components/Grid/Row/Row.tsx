import {Component, Prop,Watch, h,Method, Element,Build,State} from '@stencil/core';
import { Gutter } from '../../../interface';
import { matchBreakpoint } from  '../../../utils/styles'

@Component({
  tag: 'mi-row',
  styleUrl: 'row.scss',
})
export class MiRow {

  @State() _gutter:number = 0;

  @Element() el!: HTMLElement;


  /**
   * 栅格间隔，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}
   */
  @Prop() gutter: number | Gutter = 8 ;


  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  @Method() async resize(){
    if(Build.isBrowser&&typeof this.gutter =='object'){
      this.getGutter();
    }
  }

  @Method() async getGutter(){
   let _self = this;
   Object.entries(this.gutter).map(e=>{
      if(matchBreakpoint(e[0])){
        _self._gutter=e[1];
      }
    })
  }

  @Watch('_gutter')
  @Method() async renderChildNode(){
    const els = this.el.getElementsByClassName('mi-col');
    if(els&&els.length>0){
      Array.from(els).map((el,i)=>{
        (el as HTMLElement).style.paddingLeft = this._gutter/2+'px';
        (el as HTMLElement).style.paddingRight = this._gutter/2+'px';
        if(i == 0){
          (el as HTMLElement).style.paddingLeft = '0px'
        }else if(i == els.length-1){
          (el as HTMLElement).style.paddingRight = '0px'
        }
      })
    }

  }

  componentDidLoad(){
  }

  render() {
    let attrs = {},flexAttr={};
    const { props } = this;
    attrs = Object.assign(attrs,flexAttr,props);
    return (
          <resize-observer resize={this.resize.bind(this)}>
            <div
              class={{
                [`mi-row`]:true,
              }}
              {...attrs}
            >
              <slot></slot>
            </div>
          </resize-observer>
  )
  }

}
