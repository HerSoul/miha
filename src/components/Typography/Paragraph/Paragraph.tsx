import {Component, ComponentInterface, Prop, h, Element,State,Method} from '@stencil/core';
import { Ellipsis } from "../../../interface";
import { addStyles } from '../../../utils/styles'
@Component({
  tag: 'mi-paragraph',
  styleUrl: '../typography.scss',
  shadow: true
})
export class Paragraph  implements ComponentInterface {

  @State() isExpend : boolean = false;

  @Element() el!: HTMLElement;
  /**
   * 自动溢出省略
   */
  @Prop() ellipsis: boolean | Ellipsis;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  @Method() toggleExpand(){
    this.isExpend = !this.isExpend;
    if((this.ellipsis as Ellipsis).onExpand){
      (this.ellipsis as Ellipsis).onExpand(this.isExpend);
    }
  }

  componentDidLoad() {
    const { ellipsis } = this;
    if(!ellipsis)return;
    const ellipsisInfo = (ellipsis as Ellipsis);
    console.log(this.el.shadowRoot.querySelector('p'));
    if(ellipsisInfo.row){
      this.isExpend=ellipsisInfo.expaned;
      addStyles(this.el.shadowRoot,{
        '-webkit-line-clamp': ellipsisInfo.row
      },'span')
    }
  }

  hostData(){
    let classs = {};
    const {props,ellipsis} = this;
    if(typeof ellipsis == "boolean"){
      classs['ellipsis-single-line'] = true;
    }else if(typeof ellipsis == "object"){
      classs['ellipsis-multiple-line'] = true;
    }
    return {
      prop:{...props},
      class:{
        "mi-typography":true,
        ...classs
      }
    };
  }

  render(){
    let text = this.isExpend ? '收起' :'展开';
    return(
      // @ts-ignore
      h('p',{
        // @ts-ignore
      },h('span',{},h('slot',{})),h('a',{
        class:{'mi-typography-expend':true},
        onClick:this.toggleExpand
      },text))
    )

  }



}


