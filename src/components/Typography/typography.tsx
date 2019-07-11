import {Component, ComponentInterface, Listen, Prop} from '@stencil/core';

@Component({
  tag: 'mi-typography',
  styleUrl: 'typography.scss',
  shadow: true
})
export class Typography implements ComponentInterface {
  /**
   * 代办
   */

  /**
   * 用户提交编辑内容时触发
   */
  @Listen('change')
  onChange(ev){
    console.log(ev);
  }

  /**
   * 排版文字的交互行为
   */
  @Prop() action: 'copyable' | 'editable';

  /**
   * 禁用文本
   */
  @Prop() disabled: boolean = false;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;



  render(){
    return {

    }
  }



}


