import {Component, ComponentInterface, Prop, h} from '@stencil/core';

@Component({
  tag: 'mi-title',
  styleUrl: '../typography.scss',
  shadow: true
})
export class Title implements ComponentInterface {

  /**
   * 排版标题的级别
   */
  @Prop() lv: number;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  hostData(){
    const {lv,props} = this;
    return {
      prop:{...props},
      class:{
        "mi-typography":true,
        [`typography-title${lv}`]:lv != undefined
      }
    };
  }

  render(){
    const {lv} = this;
    var tag = 'h'+lv;
    return(
      // @ts-ignore
      h(tag,{
        // @ts-ignore
      },h('slot'))
    )

  }



}


