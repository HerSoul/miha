import {Component, Prop, h, Host, State} from '@stencil/core';

// type LayOut = 'total'| 'sizes' | 'prev' | 'pager' | 'next' | 'jumper' ;

interface RenderFn {
  (page:Cell,type?:'page' | 'prev' | 'next'):void
}
interface Cell {
   count:number,
   index:number
}


@Component({
  tag: 'mi-pagination',
  styleUrl: 'Pagination.scss',
  shadow:true
})
export class MiPagination{

  @State() _current:number;

  @State() _pageSize:number;

  @State() cellArray:Array<Cell>=[];

  @State() remainder:number =0;

  /**
   * 当前页数
   */
  @Prop() current: number;

  /**
   * 默认当前页数
   */
  @Prop() defaultCurrent: number = 1;

  /**
   * 默认的每页条数
   */
  @Prop() defaultPageSize: number = 10;

  /**
   * 禁用分页
   */
  @Prop() disabled: boolean = false;

  /**
   * 只有一页时是否隐藏分页器
   */
  @Prop() hideOnSinglePage: boolean = false;

  /**
   * 当添加该属性时，显示为简单分页
   */
  @Prop() simple: boolean = false;

  /**
   * 用于自定义页码的结构
   */
  @Prop() renderItem:Function;

  /**
   * 每页条数
   */
  @Prop() pageSize:number;

  /**
   * 指定每页可以显示多少条
   */
  @Prop() pageSizeOptions:Array<number>;

  /**
   * 组件布局，子组件名用逗号分隔
   */
  @Prop() layout:string = 'prev, pager, next, jumper, total';

  /**
   * size	当为「small」时，是小尺寸分页
   */
  @Prop() size:string = '';

  /**
   * 页码改变的回调，参数是改变后的页码及每页条数
   */
  @Prop() change:Function = ()=>{};

  /**
   * 数据总数
   */
  @Prop() total:number;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: {[prop: string]: any} ;

  componentDidLoad(){
    this.getComputed();
  }

  _itemClick(cell){
   this._current=cell;
   this.change(cell,cell.count);
  }

  _utifyRenderItem:RenderFn=(page,type)=>{
      if(this.renderItem){
        return this.renderItem(page,type)
      }else{
        return this.defaultRenderItem(page,type)
      }
  }
  defaultRenderItem:RenderFn=(page)=>{
    return (
      <a>{page}</a>
    )
  }
  getComputed(){
    let length:number;
    this._current = this.current?this.current:this.defaultCurrent;
    this._pageSize = this.pageSize?this.pageSize:this.defaultPageSize;
    this.remainder = this.total % this._pageSize;
    length = Math.floor(this.total / this._pageSize )+(this.remainder>0?1:0);
    if(this._current>length){
      this._current=length;
    }
    for (var i =1;i<=length;i++){
      if(this.remainder>0){
        this.cellArray.push({
          index:i,
          count:this._pageSize
        });
        if(i==length){
          this.cellArray[length]={
            index:i,
            count:this.remainder
          }
        }
      }else{
        this.cellArray.push({
          index:i,
          count:this._pageSize
        });
      }
    }
  }
  renderPager=()=>{
    let type:'page' | 'prev' | 'next',_self = this;
    return  this.cellArray.map((cell)=>{
      if(_self._current==cell.index){
        type='page'
      }else if(_self._current<=cell.index){
        type='prev'
      }else{
        type='next'
      };
      return (<li onClick={this._itemClick.bind(this,cell)} class={{'mi-pagination-cell': true, 'cell-active': type == 'page'}} mi-pagination-id={cell.index}>
        {_self._utifyRenderItem(cell,type)}
      </li>)
    })
  }

  render() {
    const { props,renderPager } = this;
    return (
      <Host
        class={{
          'mi-pagination':true,
        }}
        {...props}
      >
        {renderPager()}
      </Host>
    )
  }

}
