import {Component, ComponentInterface, Prop, h} from '@stencil/core';
import { TypographyTheme  } from "../../../interface";

@Component({
  tag: 'mi-text',
  styleUrl: '../typography.scss',
  shadow: true
})

export class Title  implements ComponentInterface {

  /**
   *  排版文字的主题
   */
  @Prop() theme:TypographyTheme = 'normal' ;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  hostData(){
    const {props} = this;
    return {
      prop:{...props},
      class:{
        "mi-typography":true
      }
    };
  }

  render(){
    let tag:string;
    const { theme } = this;
    tag = theme;
    if(theme == 'normal'){
      tag = 'span';
    }else if(theme == 'delete'){
      tag = 'del'
    }else if(theme == 'underline'){
      tag = 'u'
    }
    return(
      // @ts-ignore
      h(tag,{
        // @ts-ignore
      },h('slot'))
    )

  }



}


