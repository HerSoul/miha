import {Component, Prop, h, Element, Host} from '@stencil/core';
import { Route } from '../Breadcrumb/type'
/**
 * @slot default - 默认的内容
 * @slot tags - title 旁的 tag 列表插槽
 * @slot end - 操作区，位于 title 行的行尾
 * @Slot footer - PageHeader 的页脚
 */
@Component({
  tag: 'mi-page-header',
  styleUrl: 'pageHeader.scss',
})
export class MiPageHeader {
  @Element() el!: HTMLElement;

  /**
   * 自定义标题文字
   */
  @Prop() titles: string ;

  /**
   * 自定义的二级标题文字
   */
  @Prop() subTitle: string;

  /**
   * 自定义 back icon'
   */
  @Prop() backIcon: string  = 'arrow_back';

  /**
   * 面包屑的配置
   */
  @Prop() breadcrumb: Array<Route>;

  /**
   * 返回按钮的点击事件
   */
  @Prop() onBack:()=>void=()=>{};

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  renderBackIcon=()=>{
    return (
      <span class="mi-page-header-back-icon" onClick={this._handelOnBack}>
         <mi-icon  icon={this.backIcon}></mi-icon>
         <mi-divider type="vertical"></mi-divider>
      </span>
    )
  }
  renderTitle=(isSub=false)=>{
    const  { titles,subTitle } = this;
    return (
      !isSub?(<span class="mi-page-header-title">
        {titles}
      </span>):
      (<span class="mi-page-header-sub-title">
        {subTitle}
      </span>)
    )
  }
  _handelOnBack=()=>{
    this.onBack();
  }
  render() {
    const { renderBackIcon,renderTitle,titles,subTitle,breadcrumb } = this;
    return (
      <Host
        class={{
          'mi-page-header':true
        }}
      >
       <div>
         {breadcrumb&&breadcrumb.length>0?(<div class="mi-breadcrumb-wapper"><mi-breadcrumb routes={breadcrumb}></mi-breadcrumb></div>):''}
        <div class="mi-page-header-title-wapper">
          {renderBackIcon()}
          {titles?renderTitle():''}
          {subTitle?renderTitle(true):''}
          <slot name="tags"></slot>
          <span class="mi-page-header-end-slot">
              <slot name="end"></slot>
          </span>
        </div>
        <slot></slot>
        <slot name="footer"></slot>
       </div>
      </Host>
    )
  }

}
