import {
  Component,
  ComponentInterface,
  Prop,
  Host,
  State,
  h, Element
} from '@stencil/core';
import {Route} from '../type';
import {is} from '../../../utils/typeof';
import {elementToString,findChildEls} from '../../../utils/styles'

/**
 * @slot - 默认内容插槽
 */
@Component({
  tag: 'mi-breadcrumb',
  shadow: true
})
export class Breadcrumb implements ComponentInterface {

  @Element() el!: HTMLElement;

  @State() childrens:any[] | NodeListOf<Element>;
  /**
   * 根据路由信息，自定义面包屑每一项
   */
  @Prop() renderItem?: (route: Route, params: Object, routes: Array<Route>) => HTMLElement;

  /**
   * 路由的参数
   */
  @Prop() params: Object;

  /**
   * 路由栈信息
   */
  @Prop() routes: Array<Route> = [];

  /**
   * 分隔符自定义
   */
  @Prop() separator: String | HTMLElement = '/';

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: { [prop: string]: any };


   componentDidLoad() {
    var _self = this;
    this.childrens = findChildEls(this.el,'.mi-breadcrumb-item');
     Array.from(this.childrens).map(el=>{
      el['_separator']=_self.renderSeparator();
    })
  }

  componentDidUnload() {

  }

  componentDidUpdate() {

  }

  renderSeparator=()=>{
    if (is(this.separator, '[object String]')) {
      return this.separator
    } else {
      return elementToString((this.separator as HTMLElement), true)
    }
  }



  unifyRenderFn=(route: Route, params: Object, routes: Array<Route>)=>{
      if(this.renderItem){
        return this.renderItem(route, params, routes)
      }else {
        return (<span>{route.breadcrumbName}</span>)
      }
   }

   renderAllbreadcrumbs=()=>{
     return this.routes.map(route=>{
       var element = this.unifyRenderFn(route,this.params,this.routes);
       // 如果为原生转为字符串
       if(is(element,element=>element instanceof Element)){
         return (<mi-breadcrumb-item innerHTML={elementToString(element,true)} _separator={this.renderSeparator() as string}>
         </mi-breadcrumb-item>)
       }
       return (<mi-breadcrumb-item  _separator={this.renderSeparator() as string}>
         {element}
       </mi-breadcrumb-item>)
     })
   }

  render() {
    const {props,renderAllbreadcrumbs,routes} = this;
    return (
      <Host
        {...props}
        class={{
          'mi-breadcrumb': true
        }}
      >
        {
          routes&&routes.length>0?
          renderAllbreadcrumbs()
          :(<slot></slot>)
        }

      </Host>
    )
  }


}


