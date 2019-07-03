import {Component, ComponentInterface, h, Host, Listen, Prop} from '@stencil/core';
import { TypographyTheme } from '../../interface'
interface Ellipsis {
  row:number,
  expaned:boolean
}
@Component({
  tag: 'mi-typography',
  styleUrl: 'typography.scss',
  shadow: true
})
export class Typography implements ComponentInterface {
  /**
   *  排版文字的主题
   */
  @Prop() theme:TypographyTheme ;

  /**
   * 自动溢出省略
   */
  @Prop() ellipsis: boolean | Ellipsis;

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
   * 排版标题的级别
   */
  @Prop() lv: number;

  render(){
    return (
      <Host class={{
        "mi-typography":true
      }}>

      </Host>
    )
  }





}


